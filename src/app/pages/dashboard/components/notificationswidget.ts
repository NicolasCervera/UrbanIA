import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
    standalone: true,
    selector: 'app-notifications-widget',
    imports: [CommonModule, TableModule, ButtonModule, MenuModule],
    template: `
    <div class="card h-full">
        <div class="flex align-items-center justify-content-between mb-4">
            <div>
                <span class="block text-xl font-bold text-900 mb-1">Actividad Reciente</span>
                <span class="text-sm text-500">Centro de control operativo</span>
            </div>
            <button pButton icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"></button>
        </div>

        <p-table [value]="notifications" 
                 responsiveLayout="scroll" 
                 styleClass="p-datatable-sm align-middle">
            
            <ng-template pTemplate="body" let-note>
                <tr class="border-bottom-1 surface-border hover:surface-hover transition-colors transition-duration-200">
                    
                    <td style="width: 60px; text-align: center; padding: 1rem 0.5rem;">
                        <div class="flex align-items-center justify-content-center border-circle shadow-1 mx-auto"
                             [ngClass]="'bg-' + note.color + '-100 text-' + note.color + '-600'"
                             style="width: 40px; height: 40px;">
                            <i [class]="'text-lg pi ' + note.icon"></i>
                        </div>
                    </td>

                    <td style="width: 15%; min-width: 140px; padding: 1rem 0.5rem;">
                        <span class="font-bold text-900 block">{{ note.title }}</span>
                        <span class="text-xs text-500 uppercase font-semibold tracking-wide">{{ note.category }}</span>
                    </td>

                    <td style="padding: 1rem 0.5rem;">
                        <span class="text-600 line-height-3 text-sm block" 
                              style="max-width: 400px; white-space: normal;">
                            {{ note.detail }}
                        </span>
                    </td>

                    <td style="width: 20%; min-width: 150px; padding: 1rem 0.5rem;">
                        <div class="flex align-items-center gap-2" *ngIf="note.highlight">
                            <i class="pi pi-map-marker text-primary text-sm"></i>
                            <span class="font-semibold text-primary text-sm">{{ note.highlight }}</span>
                        </div>
                    </td>

                    <td style="width: 100px; text-align: right; padding: 1rem 0.5rem;">
                        <div class="flex align-items-center justify-content-end gap-1 text-500">
                            <i class="pi pi-clock text-xs"></i>
                            <span class="text-xs font-medium white-space-nowrap">{{ note.time }}</span>
                        </div>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>`
})
export class NotificationsWidget {
    notifications = [
        {
            title: 'Visita Agendada',
            category: 'Agenda',
            detail: 'El Dr. Roberto Gómez confirmó su asistencia para la visita guiada.',
            highlight: 'Torre Ejecutiva 4B',
            time: '25 min',
            icon: 'pi-calendar',
            color: 'blue'
        },
        {
            title: 'Oferta Recibida',
            category: 'Ventas',
            detail: 'Se recibió una propuesta formal de compra por $240,000 USD.',
            highlight: 'Residencial Harmony',
            time: '2 hrs',
            icon: 'pi-dollar',
            color: 'green'
        },
        {
            title: 'Nuevo Lead',
            category: 'Marketing',
            detail: 'Carlos Ruiz (Inversionista) solicitó información vía web.',
            highlight: 'Portal Inmobiliario',
            time: '14:30',
            icon: 'pi-user-plus',
            color: 'cyan'
        },
        {
            title: 'Alerta Contrato',
            category: 'Legal',
            detail: 'La renovación del alquiler vence en 5 días. Requiere acción.',
            highlight: 'Quinta Los Laureles',
            time: '09:15',
            icon: 'pi-exclamation-triangle',
            color: 'orange'
        },
        {
            title: 'Documentación',
            category: 'Trámites',
            detail: 'La notaría envió la escritura finalizada lista para firma.',
            highlight: 'Lote Industrial Norte',
            time: 'Ayer',
            icon: 'pi-file-pdf',
            color: 'purple'
        }
    ];
}