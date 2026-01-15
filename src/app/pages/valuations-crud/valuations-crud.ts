import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Esto arregla el ngClass/ngIf
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

// IMPORTS DE PRIMENG (Basado en tu HTML y PrimeNG v18+)
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select'; // O DropdownModule si usas v17
import { DatePickerModule } from 'primeng/datepicker'; // O CalendarModule si usas v17
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { TimelineModule } from 'primeng/timeline';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// --- MODELOS (Puedes moverlos a un archivo aparte si quieres) ---
export interface Documento {
  nombre: string;
  tipo: 'PDF' | 'IMG';
  url?: string;
}

export interface HistorialValor {
  fecha: Date;
  valor: number;
  observacion: string;
}

export interface Valuation {
  id: number;
  propiedad: string;
  tasador: string;
  fechaSolicitud: Date;
  fechaTasacion?: Date;
  valorMercado: number;
  valorAnterior?: number;
  estado: 'SOLICITADA' | 'EN PROCESO' | 'FINALIZADA' | 'VENCIDA';
  documentos: Documento[];
  historial: HistorialValor[];
}

@Component({
  selector: 'app-valuations-crud',
  standalone: true, // <--- CLAVE: Esto permite importar módulos aquí directo
  imports: [
    CommonModule, // Arregla el NG8002
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SelectModule,      // Cambiar a DropdownModule si te da error
    DatePickerModule,  // Cambiar a CalendarModule si te da error
    InputNumberModule,
    TagModule,
    TooltipModule,
    TimelineModule,
    FileUploadModule,
    ToastModule
  ],
  templateUrl: './valuations-crud.html',
  styleUrls: ['./valuations-crud.scss'],
  providers: [MessageService]
})
export class ValuationsCrudComponent implements OnInit {

  valuationForm: FormGroup;
  valuations: Valuation[] = [];
  selectedValuation: Valuation | null = null;

  // Opciones para el Select
  estados = [
    { label: 'Solicitada', value: 'SOLICITADA' },
    { label: 'En Proceso', value: 'EN PROCESO' },
    { label: 'Finalizada', value: 'FINALIZADA' },
    { label: 'Vencida', value: 'VENCIDA' }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.valuationForm = this.fb.group({
      propiedad: ['', Validators.required],
      tasador: ['', Validators.required],
      estado: ['SOLICITADA', Validators.required],
      fechaTasacion: [new Date(), Validators.required],
      valorMercado: [null, Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    // DATOS DE EJEMPLO (MOCK)
    this.valuations = [
      {
        id: 1,
        propiedad: 'Torre Bellini - 4B',
        tasador: 'Inmobiliaria Talo',
        fechaSolicitud: new Date('2024-01-10'),
        fechaTasacion: new Date('2024-01-15'),
        valorMercado: 125000,
        valorAnterior: 110000,
        estado: 'FINALIZADA',
        documentos: [{ nombre: 'Tasacion_Oficial.pdf', tipo: 'PDF' }],
        historial: [
          { fecha: new Date('2023-01-15'), valor: 110000, observacion: 'Tasación 2023' },
          { fecha: new Date('2024-01-15'), valor: 125000, observacion: 'Actualización mercado' }
        ]
      },
      {
        id: 2,
        propiedad: 'Local Av. Santa Fe',
        tasador: 'Peritos Asociados',
        fechaSolicitud: new Date('2024-02-01'),
        fechaTasacion: undefined,
        valorMercado: 0,
        estado: 'EN PROCESO',
        documentos: [],
        historial: []
      }
    ];
  }

  saveValuation() {
    if (this.valuationForm.valid) {
      const formValues = this.valuationForm.value;

      // 1. Creamos el objeto nuevo con los datos del formulario
      const newValuation: Valuation = {
        id: Date.now(), // Generamos un ID único temporal
        propiedad: formValues.propiedad,
        tasador: formValues.tasador,
        fechaSolicitud: new Date(), // Asumimos fecha actual
        fechaTasacion: formValues.fechaTasacion,
        valorMercado: formValues.valorMercado,
        valorAnterior: 0, // Como es nueva, no tiene referencia anterior
        estado: formValues.estado,
        documentos: [], // Arranca sin docs
        historial: [ // Agregamos el primer hito al historial
          {
            fecha: formValues.fechaTasacion || new Date(),
            valor: formValues.valorMercado,
            observacion: 'Tasación inicial'
          }
        ]
      };

      // 2. Lo agregamos al inicio de la lista (usando spread operator para refrescar la tabla)
      this.valuations = [newValuation, ...this.valuations];

      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tasación agregada correctamente' });

      // 3. Reseteamos el formulario
      this.valuationForm.reset({
        estado: 'SOLICITADA', // Dejamos valores por defecto útiles
        fechaTasacion: new Date()
      });

    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completa los campos obligatorios' });
      this.valuationForm.markAllAsTouched(); // Marca los campos en rojo para que veas qué falta
    }
  }

  // --- LÓGICA VISUAL ---

  // Colores de los Tags
  getSeverity(estado: string): "success" | "info" | "warning" | "danger" | "secondary" | "contrast" | undefined {
    switch (estado) {
      case 'FINALIZADA': return 'success'; // Verde
      case 'EN_PROCESO': return 'info';    // Azul
      case 'SOLICITADA': return 'warning'; // Naranja
      case 'VENCIDA': return 'danger';     // Rojo
      default: return 'info';
    }
  }

  // Flechitas de Tendencia (Subió/Bajó)
  getTrend(val: Valuation): { icon: string, color: string } {
    if (!val.valorAnterior || !val.valorMercado) return { icon: 'pi-minus', color: 'text-500' };

    if (val.valorMercado > val.valorAnterior) {
      return { icon: 'pi-arrow-up', color: 'text-green-500' };
    } else if (val.valorMercado < val.valorAnterior) {
      return { icon: 'pi-arrow-down', color: 'text-red-500' };
    }
    return { icon: 'pi-minus', color: 'text-500' };
  }

  // Abrir Expediente
  viewDetail(val: Valuation) {
    this.selectedValuation = val;
  }

  // Mocks de documentos
  openDoc(doc: Documento) {
    console.log('Abriendo documento:', doc.nombre);
  }

  deleteDoc(doc: Documento) {
    if (this.selectedValuation) {
      this.selectedValuation.documentos = this.selectedValuation.documentos.filter(d => d !== doc);
    }
  }
}