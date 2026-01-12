import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

// --- PRIMENG 18+ IMPORTS ACTUALIZADOS ---
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';         // Reemplaza a Dropdown
import { DatePickerModule } from 'primeng/datepicker'; // Reemplaza a Calendar
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

// Asegurate que la ruta al modelo esté bien
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
    SelectModule,      // <--- Nuevo (v18)
    DatePickerModule,  // <--- Nuevo (v18)
    InputNumberModule,
    SelectButtonModule,
    DividerModule,
    TooltipModule
  ],
  templateUrl: './payments-crud.html', // Ojo: en tu foto el archivo se llama .html (sin component)
  styleUrls: ['./payments-crud.scss']   // Ojo: en tu foto el archivo se llama .scss (sin component)
})
export class PaymentsCrud implements OnInit { // <--- ACÁ ESTÁ EL NOMBRE QUE VOS QUERÉS

  paymentForm: FormGroup;
  payments: Payment[] = [];
  contracts: ContractOption[] = [];

  luzOptions: any[] = [{ label: 'Monto Fijo', value: 'FIJO' }, { label: 'Calculadora', value: 'CALCULO' }];

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      contract: [null, Validators.required],
      periodo: [new Date(), Validators.required],

      alquiler: [0, Validators.required],
      expensas: [0],
      agua: [0],
      gas: [0],

      luzMetodo: ['FIJO'],
      luzMontoFijo: [0],
      luzKwh: [0],
      luzPrecio: [100],

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
      { id: 102, contractId: 2, locatario: 'Maria Gomez', propiedad: 'Local Centro', periodo: new Date(2025, 11, 1), alquiler: 250000, expensas: 0, agua: 0, gas: 0, luzMetodo: 'CALCULO', luzKwh: 300, luzPrecioKwh: 80, luzTotal: 24000, totalPagar: 274000, estado: 'PAGADO' },
      { id: 103, contractId: 1, locatario: 'Juan Pérez', propiedad: 'Depto 4B', periodo: new Date(2026, 0, 1), alquiler: 450000, expensas: 60000, agua: 6000, gas: 0, luzMetodo: 'FIJO', luzTotal: 0, totalPagar: 516000, estado: 'PENDIENTE' }
    ];

    this.paymentForm.valueChanges.subscribe(() => {
      this.calculateTotal();
    });

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
    console.log('Guardando...', this.paymentForm.getRawValue());
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