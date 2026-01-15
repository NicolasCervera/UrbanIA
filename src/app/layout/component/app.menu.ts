import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Principal',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/'] }
                ]
            },
            {
                label: 'Gestión',
                items: [
                    { label: 'Propiedades', icon: 'pi pi-fw pi-home', routerLink: ['/propiedades'] },
                    { label: 'Clientes', icon: 'pi pi-fw pi-users', routerLink: ['/clientes'] },
                    { label: 'Contratos', icon: 'pi pi-fw pi-file', routerLink: ['/contratos'] },
                    { label: 'Pagos', icon: 'pi pi-fw pi-dollar', routerLink: ['/pagos'] },
                    { label: 'Tasaciones', icon: 'pi pi-fw pi-home', routerLink: ['/tasaciones'] }
                ]
            }
        ];
    }
}
