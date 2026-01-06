import { Component, OnInit } from '@angular/core'; // IMPORT CORRECCIÓN DEFINITIVA
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Product, ProductService } from '../../service/product.service';

@Component({
    standalone: true,
    selector: 'app-recent-sales-widget',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule, TagModule],
    template: `
    <div class="card mb-8">
        <div class="flex align-items-center mb-5">
            <div>
                <span class="block text-xl font-semibold mb-1">Propiedades Destacadas</span>
                <span class="text-500 text-sm">Silvia Jaramillo Negocios - Gestión de Inventario</span>
            </div>
            
            <button pButton pRipple type="button" 
                    icon="pi pi-plus" 
                    label="Añadir Propiedad" 
                    class="p-button-raised p-button-primary border-round-lg shadow-2 ml-auto">
            </button>
        </div>
        
        <p-table [value]="products" [paginator]="true" [rows]="5" responsiveLayout="scroll" [rowHover]="true">
            <ng-template #header>
                <tr>
                    <th style="width: 10%; text-align: center;">Vista</th>
                    <th pSortableColumn="name" style="width: 25%;">Propiedad <p-sortIcon field="name"></p-sortIcon></th>
                    <th style="width: 20%;">Ubicación</th>
                    <th pSortableColumn="price" style="width: 15%; text-align: right;">Precio <p-sortIcon field="price"></p-sortIcon></th>
                    <th style="width: 15%; text-align: center;">Operación</th>
                    <th style="width: 15%; text-align: center;">Acciones</th>
                </tr>
            </ng-template>
            <ng-template #body let-product let-i="rowIndex">
                <tr style="height: 75px">
                    <td style="text-align: center; vertical-align: middle;">
                        <img [src]="'https://loremflickr.com/200/150/house,building?lock=' + i" 
                             class="shadow-2 border-round" 
                             style="width: 65px; height: 48px; object-fit: cover;" />
                    </td>
                    
                    <td style="vertical-align: middle;">
                        <span class="font-bold text-900">{{ getRealEstateName(i) }}</span>
                    </td>

                    <td style="vertical-align: middle;">
                        <span class="text-sm text-600 flex align-items-center">
                            <i class="pi pi-map-marker text-primary mr-2"></i>Distrito {{ (i % 3) + 1 }}
                        </span>
                    </td>
                    
                    <td style="vertical-align: middle; text-align: right;">
                        <span class="text-900 font-bold text-lg">{{ product.price | currency: 'USD':'symbol':'1.0-0' }}</span>
                    </td>
                    
                    <td style="vertical-align: middle; text-align: center;">
                        <p-tag [value]="i % 2 === 0 ? 'VENTA' : 'ALQUILER'" 
                               [severity]="i % 2 === 0 ? 'success' : 'info'"
                               [style]="{'width': '80px', 'font-weight': '600'}">
                        </p-tag>
                    </td>
                    
                    <td style="vertical-align: middle; text-align: center;">
                        <div class="flex justify-content-center gap-2">
                            <button pButton pRipple type="button" icon="pi pi-whatsapp" class="p-button-rounded p-button-success p-button-text"></button>
                            <button pButton pRipple type="button" icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-text"></button>
                        </div>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>`,
    providers: [ProductService]
})
export class RecentSalesWidget implements OnInit {
    products!: Product[];

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProductsSmall().then((data) => (this.products = data));
    }

    getRealEstateName(index: number): string {
        const names = ['Residencial Harmony', 'Torre Ejecutiva', 'Quinta Los Laureles', 'Apartamento Skyline', 'Casa Hacienda', 'Duplex Central'];
        return names[index % names.length];
    }
}