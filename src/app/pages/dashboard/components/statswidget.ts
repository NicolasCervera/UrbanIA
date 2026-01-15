import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    template: `
    <div *ngFor="let stat of stats" class="col-span-12 lg:col-span-6 xl:col-span-3">
      
      <div class="relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full">
        
        <div [class]="'absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full opacity-10 blur-2xl ' + stat.colorBg"></div>

        <div class="relative z-10 flex flex-col justify-between h-full">
          
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="block text-gray-500 font-semibold mb-1 text-sm uppercase tracking-wide">{{ stat.label }}</span>
              <div class="text-gray-900 dark:text-white font-bold text-3xl tracking-tight">{{ stat.value }}</div>
            </div>
            
            <div [class]="'flex items-center justify-center w-10 h-10 rounded-xl ' + stat.colorLight">
              <i [class]="stat.icon + ' text-lg ' + stat.colorText"></i>
            </div>
          </div>

          <div class="flex items-end justify-between mt-2">
            
            <div class="flex flex-col gap-1">
              <span [class]="'flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md w-fit ' + (stat.trendUp ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700')">
                <i [class]="'text-[10px] pi ' + (stat.trendUp ? 'pi-arrow-up' : 'pi-exclamation-circle')"></i> 
                {{ stat.trendValue }}
              </span>
              <span class="text-gray-400 text-xs font-medium pl-1">{{ stat.period }}</span>
            </div>

            <div class="w-20 h-10 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
               <svg viewBox="0 0 100 40" class="w-full h-full overflow-visible">
                  <path [attr.d]="stat.chartPath" 
                        fill="none" 
                        [attr.stroke]="stat.chartColor" 
                        stroke-width="3" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"/>
                </svg>
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class StatsWidget {

    stats = [
        {
            label: 'Propiedades',
            value: '48',
            icon: 'pi pi-home',
            colorLight: 'bg-blue-50 dark:bg-blue-900/20',
            colorText: 'text-blue-600',
            colorBg: 'bg-blue-500',
            chartColor: '#3B82F6',
            trendUp: true,
            trendValue: '6 nuevas',
            period: 'este mes',
            chartPath: 'M0 30 Q 10 25, 20 28 T 40 20 T 60 15 T 80 10 L 100 5'
        },
        {
            label: 'Ingresos',
            value: '$3.45M',
            icon: 'pi pi-wallet',
            colorLight: 'bg-emerald-50 dark:bg-emerald-900/20',
            colorText: 'text-emerald-600',
            colorBg: 'bg-emerald-500',
            chartColor: '#10B981',
            trendUp: true,
            trendValue: '+18%',
            period: 'vs anterior',
            chartPath: 'M0 35 Q 20 35, 30 25 T 60 20 T 100 5'
        },
        {
            label: 'Clientes',
            value: '126',
            icon: 'pi pi-users',
            colorLight: 'bg-cyan-50 dark:bg-cyan-900/20',
            colorText: 'text-cyan-600',
            colorBg: 'bg-cyan-500',
            chartColor: '#06B6D4',
            trendUp: true,
            trendValue: '9 nuevos',
            period: 'esta semana',
            chartPath: 'M0 20 Q 25 25, 50 15 T 100 10'
        },
        {
            // --- CAMBIO AQUÍ ---
            label: 'Contratos Finalizados', // Nombre nuevo
            value: '154',                   // Valor acumulado histórico
            icon: 'pi pi-folder-open',      // Icono de archivo/historial
            colorLight: 'bg-purple-50 dark:bg-purple-900/20',
            colorText: 'text-purple-600',
            colorBg: 'bg-purple-500',
            chartColor: '#A855F7',
            trendUp: true,                  // Tendencia positiva (productividad)
            trendValue: '+12',              // Datos de cierre
            period: 'este año',
            chartPath: 'M0 25 Q 30 30, 50 15 T 100 5' // Curva ascendente
        }
    ];
}