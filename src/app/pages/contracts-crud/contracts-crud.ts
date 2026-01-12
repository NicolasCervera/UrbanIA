import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

// --- PRIMENG 18+ IMPORTS ---
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';          // Reemplazo de Dropdown
import { DatePickerModule } from 'primeng/datepicker';  // Reemplazo de Calendar
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { TimelineModule } from 'primeng/timeline';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';

// Interfaz simple para el contrato
export interface Contract {
  id: number;
  locatario: string;
  propiedad: string;
  tipo: string;
  fechaInicio: Date;
  fechaVencimiento: Date;
  monto: number;
  frecuenciaAumento: string;
  tipoAumento: string;
  estado: string;
  documentos: any[];
  historialAumentos: any[];
}

@Component({
  selector: 'app-contracts-crud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    DatePickerModule,
    ToastModule,
    FileUploadModule,
    TimelineModule,
    TooltipModule
  ],
  providers: [MessageService],
  templateUrl: './contracts-crud.html',
  styleUrls: ['./contracts-crud.scss']
})
export class ContractsCrudComponent implements OnInit {

  contractForm: FormGroup;
  contracts: Contract[] = [];
  selectedContract: Contract | null = null; // Para el Legajo Digital

  // Variables para los filtros de fecha (NUEVO)
  fechaDesde: Date | null = null;
  fechaHasta: Date | null = null;

  // Opciones para Selects
  tiposContrato = [
    { label: 'Vivienda', value: 'Vivienda' },
    { label: 'Comercial', value: 'Comercial' },
    { label: 'Temporario', value: 'Temporario' }
  ];

  frecuencias = [
    { label: 'Mensual', value: 'Mensual' },
    { label: 'Trimestral', value: 'Trimestral' },
    { label: 'Semestral', value: 'Semestral' },
    { label: 'Anual', value: 'Anual' }
  ];

  indices = [
    { label: 'IPC (Indice Precios Consumidor)', value: 'IPC' },
    { label: 'ICL (Indice Contratos Locación)', value: 'ICL' },
    { label: 'Casa Propia', value: 'Casa Propia' },
    { label: 'Fijo / Pactado', value: 'Fijo' }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.contractForm = this.fb.group({
      locatario: ['', Validators.required],
      propiedad: ['', Validators.required],
      tipo: [null, Validators.required],
      fechaInicio: [null, Validators.required],
      fechaVencimiento: [null, Validators.required],
      monto: [null, Validators.required],
      frecuenciaAumento: [null, Validators.required],
      tipoAumento: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // MOCK DATA: Datos de prueba iniciales
    this.contracts = [
      {
        id: 1,
        locatario: 'Mariano Martínez',
        propiedad: 'Depto 4B - Av. Libertador',
        tipo: 'Vivienda',
        fechaInicio: new Date(2024, 2, 10),
        fechaVencimiento: new Date(2026, 2, 10), // Próximo a vencer (ejemplo)
        monto: 500000,
        frecuenciaAumento: 'Trimestral',
        tipoAumento: 'IPC',
        estado: 'VIGENTE',
        documentos: [
          { nombre: 'Contrato_Firmado.pdf', tipo: 'PDF' },
          { nombre: 'DNI_Titular.jpg', tipo: 'IMG' }
        ],
        historialAumentos: [
          { fecha: new Date(2024, 2, 10), monto: 350000 },
          { fecha: new Date(2024, 5, 10), monto: 420000 },
          { fecha: new Date(2024, 8, 10), monto: 500000 }
        ]
      },
      {
        id: 2,
        locatario: 'Sofía Gala',
        propiedad: 'Local 5 - Galería Central',
        tipo: 'Comercial',
        fechaInicio: new Date(2023, 0, 1),
        fechaVencimiento: new Date(2025, 0, 1), // Vencido (ejemplo)
        monto: 280000,
        frecuenciaAumento: 'Semestral',
        tipoAumento: 'ICL',
        estado: 'VENCIDO',
        documentos: [],
        historialAumentos: []
      }
    ];
  }

  saveContract() {
    if (this.contractForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete todos los campos obligatorios' });
      return;
    }

    const val = this.contractForm.value;

    const newContract: Contract = {
      id: Math.floor(Math.random() * 10000),
      locatario: val.locatario,
      propiedad: val.propiedad,
      tipo: val.tipo, // Si usás optionValue='value' en el HTML, esto guarda el string directo
      fechaInicio: val.fechaInicio,
      fechaVencimiento: val.fechaVencimiento,
      monto: val.monto,
      frecuenciaAumento: val.frecuenciaAumento,
      tipoAumento: val.tipoAumento,
      estado: 'VIGENTE',
      documentos: [],
      historialAumentos: [
        { fecha: new Date(), monto: val.monto } // Primer registro histórico
      ]
    };

    // Actualizamos la tabla forzando una nueva referencia del array
    this.contracts = [newContract, ...this.contracts];

    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Contrato guardado correctamente' });
    this.contractForm.reset();
  }

  // --- LÓGICA DE SEMÁFORO (Vencimientos) ---

  getSeverity(fechaVencimiento: Date): "success" | "warning" | "danger" | "info" | undefined {
    const dias = this.getDiasRestantes(fechaVencimiento);

    if (dias < 0) return 'danger';      // Vencido (Rojo)
    if (dias <= 60) return 'warning';   // Próximo (Naranja)
    return 'success';                   // Vigente (Verde)
  }

  getStatusLabel(fechaVencimiento: Date): string {
    const dias = this.getDiasRestantes(fechaVencimiento);

    if (dias < 0) return 'VENCIDO';
    if (dias <= 60) return 'PRÓXIMO';
    return 'VIGENTE';
  }

  private getDiasRestantes(fecha: Date): number {
    const hoy = new Date();
    const vencimiento = new Date(fecha);
    const diffTime = vencimiento.getTime() - hoy.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // --- LÓGICA DE LEGAJO DIGITAL ---

  viewLegajo(contract: Contract) {
    this.selectedContract = contract;
    // Scrollear hacia abajo suavemente para ver el legajo abierto
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  }

  openDoc(doc: any) {
    console.log('Abriendo documento:', doc.nombre);
    // Acá iría la lógica para descargar o abrir el PDF real
  }

  deleteDoc(doc: any) {
    if (this.selectedContract) {
      this.selectedContract.documentos = this.selectedContract.documentos.filter(d => d !== doc);
      this.messageService.add({ severity: 'info', summary: 'Eliminado', detail: 'Documento quitado del legajo' });
    }
  }
}