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
import { ValuationsCrudComponent } from './app/pages/valuations-crud/valuations-crud';

export const appRoutes: Routes = [
    // 1. REGLA DE ORO: Si entran a la raíz vacía, mandarlos al Login
    // (Asumo que dentro de auth.routes tienes una ruta 'login')
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

    // 2. BLOQUE PRIVADO: Toda la app ahora vive bajo "/app"
    {
        path: 'app',
        component: AppLayout,
        children: [
            // Si entran a /app, los mandamos al dashboard
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

            // Tus rutas normales (ahora serán /app/dashboard, /app/propiedades, etc.)
            { path: 'dashboard', component: Dashboard },
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

    // 3. RUTAS PUBLICAS (Fuera del Layout principal)
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },

    // Tu módulo de autenticación existente
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },

    { path: '**', redirectTo: '/notfound' }
];