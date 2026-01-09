import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// PrimeNG v18
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { TimelineModule } from 'primeng/timeline';
import { MessageService } from 'primeng/api';
import { Contract } from './contract.model';

@Component({
  selector: 'app-contracts-crud',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    TableModule, TagModule, InputTextModule, ButtonModule,
    SelectModule, DatePickerModule, InputNumberModule,
    FileUploadModule, ToastModule, TimelineModule
  ],
  templateUrl: './contracts-crud.html',
  providers: [MessageService]
})
export class ContractsCrudComponent implements OnInit {
  contractForm!: FormGroup;
  contracts: Contract[] = [];
  selectedContract: Contract | null = null;

  docPreview: SafeResourceUrl | null = null;
  docType: 'PDF' | 'IMG' | null = null;

  tiposContrato = [
    { label: 'Alquiler', value: 'Alquiler' },
    { label: 'Venta', value: 'Venta' }
  ];

  // NUEVAS OPCIONES PARA EL AJUSTE
  frecuencias = [
    { label: 'Mensual', value: '1 Mes' },
    { label: 'Trimestral', value: '3 Meses' },
    { label: 'Semestral', value: '6 Meses' },
    { label: 'Anual', value: 'Anual' }
  ];

  indices = [
    { label: 'ICL (Ley Alquileres)', value: 'ICL' },
    { label: 'IPC (Inflación)', value: 'IPC' },
    { label: 'Casa Propia', value: 'Casa Propia' },
    { label: 'Fijo / Pactado', value: 'Fijo' }
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.initForm();

    // Datos de prueba actualizados
    this.contracts = [{
      id: 1,
      locatario: 'Mariano Martínez',
      propiedad: 'Depto 4B - Av. Libertador',
      tipo: 'Alquiler',
      fechaInicio: new Date(2024, 0, 1),
      fechaVencimiento: new Date(2026, 2, 10),
      monto: 500000,
      // Nuevos campos con datos de ejemplo
      frecuenciaAumento: '3 Meses',
      tipoAumento: 'IPC',
      documentos: [],
      historialAumentos: [
        { fecha: new Date(2024, 0, 1), monto: 300000 },
        { fecha: new Date(2025, 0, 1), monto: 500000 }
      ]
    } as any]; // as any para que no chille si falta actualizar el modelo strict
  }

  initForm() {
    this.contractForm = this.fb.group({
      locatario: ['', Validators.required],
      propiedad: ['', Validators.required],
      tipo: ['Alquiler', Validators.required],
      fechaInicio: [null, Validators.required],
      fechaVencimiento: [null, Validators.required],
      monto: [null, [Validators.required, Validators.min(1)]],
      // Agregamos los controles al formulario
      frecuenciaAumento: ['6 Meses', Validators.required],
      tipoAumento: ['ICL', Validators.required]
    });
  }

  getSeverity(fecha: any): "success" | "warn" | "danger" | "info" {
    if (!fecha) return 'info';
    const hoy = new Date();
    const vencimiento = new Date(fecha); // Aseguramos que sea objeto Date
    const diffDays = Math.ceil((vencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'danger';
    if (diffDays <= 60) return 'warn';
    return 'success';
  }

  getStatusLabel(fecha: any): string {
    const severity = this.getSeverity(fecha);
    if (severity === 'danger') return 'VENCIDO';
    if (severity === 'warn') return 'PRÓXIMO';
    return 'VIGENTE';
  }

  viewLegajo(contract: Contract) {
    this.selectedContract = contract;
    this.docPreview = null;
  }

  saveContract() {
    if (this.contractForm.valid) {
      const nuevo = {
        id: Date.now(),
        ...this.contractForm.value,
        documentos: [],
        historialAumentos: []
      };
      this.contracts = [...this.contracts, nuevo];
      this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Contrato registrado' });
      this.contractForm.reset({
        tipo: 'Alquiler',
        frecuenciaAumento: '6 Meses',
        tipoAumento: 'ICL'
      });
    }
  }

  uploadFiles(event: any) {
    if (!this.selectedContract) return;
    for (let file of event.files) {
      const fileUrl = URL.createObjectURL(file);
      this.selectedContract.documentos.push({
        nombre: file.name,
        url: fileUrl,
        tipo: file.type.includes('pdf') ? 'PDF' : 'IMG' as any
      });
    }
    this.messageService.add({ severity: 'success', summary: 'Subida Exitosa', detail: 'Documentos agregados' });
    event.originalEvent.target.value = '';
  }

  deleteDoc(doc: any) {
    if (!this.selectedContract) return;
    this.selectedContract.documentos = this.selectedContract.documentos.filter(d => d !== doc);
    this.docPreview = null;
    this.messageService.add({ severity: 'info', summary: 'Eliminado', detail: 'Documento quitado' });
  }

  openDoc(doc: any) {
    this.docPreview = this.sanitizer.bypassSecurityTrustResourceUrl(doc.url);
    this.docType = doc.tipo;
  }

  closePreview() {
    this.docPreview = null;
  }
}