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
import { FileUploadModule } from 'primeng/fileupload'; // Lo dejamos por si querés foto de perfil
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
      tipo: ['Comprador', Validators.required], // Valor por defecto
      notas: ['']
    });
  }

  saveClient() {
    if (this.clientForm.valid) {
      this.clients.push({ ...this.clientForm.value, id: Date.now() });
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente registrado correctamente' });
      this.clientForm.reset({ tipo: 'Comprador' }); // Reseteamos manteniendo un valor por defecto
    }
  }

  deleteClient(id: number) {
    this.clients = this.clients.filter(c => c.id !== id);
  }
}