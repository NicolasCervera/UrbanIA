import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { PropertiesCrudComponent } from '@/pages/properties-crud/properties-crud';
import { ClientsCrudComponent } from '@/pages/clients-crud/clients-crud';
import { ContractsCrudComponent } from '@/pages/contracts-crud/contracts-crud';
import { PaymentsCrud } from '@/pages/payments-crud/payments-crud';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- ESTE ES EL IMPORTANTE
import { ValuationsCrudComponent } from './app/pages/valuations-crud/valuations-crud';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'propiedades', component: PropertiesCrudComponent },
            { path: 'clientes', component: ClientsCrudComponent },
            { path: 'contratos', component: ContractsCrudComponent },
            { path: 'pagos', component: PaymentsCrud },
            { path: 'tasaciones', component: ValuationsCrudComponent },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
