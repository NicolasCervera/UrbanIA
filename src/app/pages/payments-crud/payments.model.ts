export interface Payment {
    id: number;
    contractId: number;
    locatario: string;
    propiedad: string;
    periodo: Date;

    // Conceptos
    alquiler: number;
    expensas: number;
    agua: number;
    gas: number;

    // Lógica de Luz
    luzMetodo: 'FIJO' | 'CALCULO';
    luzKwh?: number;
    luzPrecioKwh?: number;
    luzTotal: number;

    totalPagar: number;
    estado: 'PENDIENTE' | 'PAGADO' | 'PARCIAL';
    fechaPago?: Date;
}

export interface ContractOption {
    id: number;
    locatario: string;
    propiedad: string;
    montoActual: number;
}