import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// PrimeNG 18+ Imports
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-clients-crud',
  providers: [MessageService],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    InputTextModule, SelectModule, TextareaModule,
    ButtonModule, TableModule, TagModule, ToastModule, FileUploadModule
  ],
  templateUrl: './clients-crud.html'
})
export class ClientsCrudComponent implements OnInit {
  clientForm!: FormGroup;
  clients: any[] = [];

  // Opciones para el Select
  clientTypes = [
    { label: 'Comprador', value: 'Comprador' },
    { label: 'Vendedor', value: 'Vendedor' },
    { label: 'Inquilino', value: 'Inquilino' },
    { label: 'Propietario', value: 'Propietario' }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.clientForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipo: ['Comprador', Validators.required],
      notas: ['']
    });

    // DATOS DE PRUEBA (Para probar el filtro al toque)
    this.clients = [
      { id: 1, nombre: 'Carlos López', telefono: '+54 9 11 1234 5678', email: 'carlos@mail.com', tipo: 'Comprador' },
      { id: 2, nombre: 'Ana García', telefono: '+54 9 11 9876 5432', email: 'ana.g@mail.com', tipo: 'Vendedor' },
      { id: 3, nombre: 'Roberto Gómez', telefono: '+54 9 11 1111 2222', email: 'robert@inmo.com', tipo: 'Inquilino' },
      { id: 4, nombre: 'Lucía Fernández', telefono: '+54 9 11 3333 4444', email: 'lucia@mail.com', tipo: 'Propietario' }
    ];
  }

  saveClient() {
    if (this.clientForm.valid) {
      // Usamos spread operator para forzar la actualización de la tabla
      const newClient = { ...this.clientForm.value, id: Date.now() };
      this.clients = [newClient, ...this.clients];

      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente registrado correctamente' });
      this.clientForm.reset({ tipo: 'Comprador' });
    }
  }

  deleteClient(id: number) {
    this.clients = this.clients.filter(c => c.id !== id);
    this.messageService.add({ severity: 'warn', summary: 'Eliminado', detail: 'Cliente eliminado' });
  }
}