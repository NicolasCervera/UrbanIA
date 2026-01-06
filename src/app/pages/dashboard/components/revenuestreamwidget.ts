import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../../layout/service/layout.service';

@Component({
    standalone: true,
    selector: 'app-revenue-stream-widget',
    imports: [ChartModule],
    template: `
    <div class="card mb-8">
        <div class="flex justify-between items-center mb-4">
            <div>
                <div class="font-bold text-xl text-900">Flujo de Ingresos</div>
                <div class="text-sm text-500">Rendimiento semestral por unidad de negocio</div>
            </div>
            <span class="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md">
                <i class="pi pi-arrow-up text-xs mr-1"></i>+24% Anual
            </span>
        </div>
        
        <div class="h-[300px]">
            <p-chart type="bar" [data]="chartData" [options]="chartOptions" height="300px" />
        </div>
    </div>`
})
export class RevenueStreamWidget implements OnInit, OnDestroy {
    chartData: any;
    chartOptions: any;
    subscription!: Subscription;

    constructor(public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Comisiones Venta',
                    backgroundColor: '#3B82F6', // Azul (Coincide con Card Propiedades)
                    data: [12000, 15000, 8000, 24000, 18000, 28000],
                    barThickness: 20,
                    borderRadius: 4
                },
                {
                    type: 'bar',
                    label: 'Renta Alquileres',
                    backgroundColor: '#22C55E', // Verde (Coincide con Card Alquileres)
                    data: [8500, 9000, 9200, 9500, 9800, 10500],
                    barThickness: 20,
                    borderRadius: 4
                },
                {
                    type: 'bar',
                    label: 'Honorarios Gestión',
                    backgroundColor: '#06b6d4', // Cian (Coincide con Card Clientes)
                    data: [2100, 2400, 2200, 3100, 2800, 3400],
                    borderRadius: {
                        topLeft: 8,
                        topRight: 8,
                        bottomLeft: 0,
                        bottomRight: 0
                    },
                    barThickness: 20
                }
            ]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true, // Bolitas redondas en la leyenda
                        font: {
                            weight: 500
                        }
                    },
                    position: 'bottom' // Leyenda abajo para dar aire al gráfico
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: 'transparent', // Sin líneas verticales
                        borderColor: 'transparent'
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary,
                        // Formatear eje Y como dinero ($)
                        callback: function (value: any) {
                            return '$' + value / 1000 + 'k';
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        borderColor: 'transparent',
                        borderDash: [5, 5], // Líneas punteadas elegantes
                        drawTicks: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}