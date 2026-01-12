import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { Payment, ContractOption } from './payments.model';

@Component({
  selector: 'app-payments-crud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    InputNumberModule,
    SelectButtonModule,
    TooltipModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './payments-crud.html',
  styleUrls: ['./payments-crud.scss']
})
export class PaymentsCrud implements OnInit {

  paymentForm: FormGroup;
  payments: Payment[] = [];
  contracts: ContractOption[] = [];

  // Variables para los filtros
  fechaDesde: Date | null = null;
  fechaHasta: Date | null = null;

  luzOptions: any[] = [{ label: 'Monto Fijo', value: 'FIJO' }, { label: 'Calculadora', value: 'CALCULO' }];

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.paymentForm = this.fb.group({
      contract: [null, Validators.required],
      periodo: [new Date(), Validators.required],
      alquiler: [0, Validators.required],
      expensas: [0],
      agua: [0],
      gas: [0],
      // Lógica Luz
      luzMetodo: ['FIJO'],
      luzMontoFijo: [0],
      luzKwh: [0],
      luzPrecio: [0],
      // Total
      total: [{ value: 0, disabled: true }]
    });
  }

  ngOnInit(): void {
    // Datos de prueba
    this.contracts = [
      { id: 1, locatario: 'Juan Pérez', propiedad: 'Depto 4B', montoActual: 450000 },
      { id: 2, locatario: 'Maria Gomez', propiedad: 'Local Centro', montoActual: 280000 },
    ];

    this.payments = [
      { id: 101, contractId: 1, locatario: 'Juan Pérez', propiedad: 'Depto 4B', periodo: new Date(2025, 11, 1), alquiler: 400000, expensas: 50000, agua: 5000, gas: 2000, luzMetodo: 'FIJO', luzTotal: 12000, totalPagar: 469000, estado: 'PAGADO' },
      { id: 102, contractId: 2, locatario: 'Maria Gomez', propiedad: 'Local Centro', periodo: new Date(2025, 11, 1), alquiler: 250000, expensas: 0, agua: 0, gas: 0, luzMetodo: 'CALCULO', luzKwh: 300, luzPrecioKwh: 80, luzTotal: 24000, totalPagar: 274000, estado: 'PAGADO' }
    ];

    // Cálculos automáticos
    this.paymentForm.valueChanges.subscribe(() => {
      this.calculateTotal();
    });

    // Auto-completar monto
    this.paymentForm.get('contract')?.valueChanges.subscribe((contract: ContractOption) => {
      if (contract) {
        this.paymentForm.patchValue({ alquiler: contract.montoActual });
      }
    });
  }

  calculateTotal() {
    const val = this.paymentForm.getRawValue();
    let totalLuz = 0;

    if (val.luzMetodo === 'FIJO') {
      totalLuz = val.luzMontoFijo || 0;
    } else {
      totalLuz = (val.luzKwh || 0) * (val.luzPrecio || 0);
    }

    const total = (val.alquiler || 0) +
      (val.expensas || 0) +
      (val.agua || 0) +
      (val.gas || 0) +
      totalLuz;

    this.paymentForm.get('total')?.setValue(total, { emitEvent: false });
  }

  savePayment() {
    if (this.paymentForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete los campos obligatorios' });
      return;
    }

    const val = this.paymentForm.getRawValue();

    let luzFinal = 0;
    if (val.luzMetodo === 'FIJO') {
      luzFinal = val.luzMontoFijo || 0;
    } else {
      luzFinal = (val.luzKwh || 0) * (val.luzPrecio || 0);
    }

    const newPayment: Payment = {
      id: Math.floor(Math.random() * 10000),
      contractId: val.contract.id,
      locatario: val.contract.locatario,
      propiedad: val.contract.propiedad,
      periodo: val.periodo,
      alquiler: val.alquiler,
      expensas: val.expensas || 0,
      agua: val.agua || 0,
      gas: val.gas || 0,
      luzMetodo: val.luzMetodo,
      luzTotal: luzFinal,
      totalPagar: this.paymentForm.get('total')?.value,
      estado: 'PENDIENTE'
    };

    // --- CORRECCIÓN CLAVE ---
    // Creamos una NUEVA referencia del array para forzar a la tabla a actualizarse
    this.payments = [newPayment, ...this.payments];

    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Pago registrado correctamente' });

    // Reseteamos valores
    this.paymentForm.reset({
      luzMetodo: 'FIJO',
      luzPrecio: 0,
      alquiler: 0,
      expensas: 0
    });
  }

  getSeverity(status: string): "success" | "warning" | "danger" | "info" | undefined {
    switch (status) {
      case 'PAGADO': return 'success';
      case 'PENDIENTE': return 'warning';
      case 'PARCIAL': return 'info';
      default: return 'danger';
    }
  }
}