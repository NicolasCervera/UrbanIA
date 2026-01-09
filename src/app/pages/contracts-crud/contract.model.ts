export interface Contract {
    id: number;
    locatario: string;
    propiedad: string;
    tipo: 'Alquiler' | 'Venta';
    fechaInicio: Date;
    fechaVencimiento: Date;
    monto: number;
    // ACÁ AGREGAMOS 'IMG' AL FINAL:
    documentos: { nombre: string, url: string, tipo: 'PDF' | 'ID' | 'Garantia' | 'IMG' }[];
    historialAumentos: { fecha: Date, monto: number }[];
}