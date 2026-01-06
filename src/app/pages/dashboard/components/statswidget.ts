import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    template: `
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0 bg-white dark:bg-gray-900 rounded-2xl border-none shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <span class="block text-500 font-semibold mb-1 text-sm uppercase tracking-wide">Propiedades</span>
                        <div class="text-900 font-bold text-3xl">48</div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 rounded-full w-12 h-12">
                        <i class="pi pi-home text-blue-500 text-xl"></i>
                    </div>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <span class="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                        <i class="pi pi-arrow-up text-xs"></i> 6 nuevas
                    </span>
                    <span class="text-500 text-sm">este mes</span>
                </div>
            </div>
        </div>

        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0 bg-white dark:bg-gray-900 rounded-2xl border-none shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <span class="block text-500 font-semibold mb-1 text-sm uppercase tracking-wide">Alquileres Cobrados</span>
                        <div class="text-900 font-bold text-3xl">$3.45M</div>
                    </div>
                    <div class="flex items-center justify-center bg-green-50 dark:bg-green-900/30 rounded-full w-12 h-12">
                        <i class="pi pi-wallet text-green-500 text-xl"></i>
                    </div>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <span class="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                        <i class="pi pi-arrow-up text-xs"></i> +18%
                    </span>
                    <span class="text-500 text-sm">vs mes anterior</span>
                </div>
            </div>
        </div>

        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0 bg-white dark:bg-gray-900 rounded-2xl border-none shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <span class="block text-500 font-semibold mb-1 text-sm uppercase tracking-wide">Cartera de Clientes</span>
                        <div class="text-900 font-bold text-3xl">126</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-50 dark:bg-cyan-900/30 rounded-full w-12 h-12">
                        <i class="pi pi-users text-cyan-500 text-xl"></i>
                    </div>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <span class="bg-cyan-100 text-cyan-700 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                        <i class="pi pi-plus text-xs"></i> 9 nuevos
                    </span>
                    <span class="text-500 text-sm">esta semana</span>
                </div>
            </div>
        </div>

        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0 bg-white dark:bg-gray-900 rounded-2xl border-none shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <span class="block text-500 font-semibold mb-1 text-sm uppercase tracking-wide">Contratos Activos</span>
                        <div class="text-900 font-bold text-3xl">32</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-50 dark:bg-purple-900/30 rounded-full w-12 h-12">
                        <i class="pi pi-file text-purple-500 text-xl"></i>
                    </div>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <span class="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                        <i class="pi pi-exclamation-circle text-xs"></i> 3 vencen
                    </span>
                    <span class="text-500 text-sm">próx. 30 días</span>
                </div>
            </div>
        </div>
    `
})
export class StatsWidget { }