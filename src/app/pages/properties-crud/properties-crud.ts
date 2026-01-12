import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
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
    DatePickerModule, InputNumberModule, SelectModule,
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

    // DATOS DE PRUEBA (Para testear el buscador)
    this.properties = [
      { id: 1, fecha: new Date('2024-01-15'), valor: 120000, tipo: 'Venta', ubicacion: 'Calle Falsa 123', detalle: 'Casa linda con patio' },
      { id: 2, fecha: new Date('2024-02-20'), valor: 450, tipo: 'Alquiler', ubicacion: 'Av. Corrientes 500', detalle: 'Monoambiente centrico' },
      { id: 3, fecha: new Date('2024-03-10'), valor: 85000, tipo: 'Venta', ubicacion: 'Zona Norte', detalle: 'Departamento 2 ambientes a estrenar' }
    ];
  }

  onUpload(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Foto cargada', detail: 'Imagen lista' });
  }

  saveProperty() {
    if (this.propertyForm.valid) {
      // Usamos el spread operator para crear una nueva referencia del array y que la tabla detecte el cambio
      const newProperty = { ...this.propertyForm.value, id: Date.now() };
      this.properties = [newProperty, ...this.properties];

      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Propiedad guardada correctamente' });
      this.propertyForm.reset({ fecha: new Date(), tipo: 'Venta' });
    }
  }

  deleteProperty(id: number) {
    this.properties = this.properties.filter(p => p.id !== id);
    this.messageService.add({ severity: 'warn', summary: 'Eliminado', detail: 'Propiedad eliminada' });
  }
}