import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker'; // Reemplaza a Calendar
import { SelectModule } from 'primeng/select';         // Reemplaza a Dropdown
import { TextareaModule } from 'primeng/textarea';     // Reemplaza a InputTextarea
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-properties-crud',
  providers: [MessageService],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    DatePickerModule, InputNumberModule, SelectModule, // Nombres actualizados
    InputTextModule, TextareaModule, FileUploadModule,
    ButtonModule, TableModule, TagModule, ToastModule
  ],
  templateUrl: './properties-crud.html'
})
export class PropertiesCrudComponent implements OnInit {
  propertyForm!: FormGroup;
  properties: any[] = [];
  typeOptions = [
    { label: 'Venta', value: 'Venta' },
    { label: 'Alquiler', value: 'Alquiler' }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.propertyForm = this.fb.group({
      fecha: [new Date(), Validators.required],
      valor: [null, [Validators.required, Validators.min(1)]],
      tipo: ['Venta', Validators.required],
      ubicacion: ['', Validators.required],
      detalle: ['', Validators.required],
      fotos: [[]]
    });
  }

  onUpload(event: any) {
    // En un caso real, aquí subirías el archivo al servidor
    this.messageService.add({ severity: 'info', summary: 'Foto cargada', detail: 'Imagen lista' });
  }

  saveProperty() {
    if (this.propertyForm.valid) {
      this.properties.push({ ...this.propertyForm.value, id: Date.now() });
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Propiedad guardada correctamente' });
      this.propertyForm.reset({ fecha: new Date(), tipo: 'Venta' });
    }
  }

  deleteProperty(id: number) {
    this.properties = this.properties.filter(p => p.id !== id);
  }
}