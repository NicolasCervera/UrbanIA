export interface Documento {
    nombre: string;
    tipo: 'PDF' | 'IMG';
    url?: string;
}

export interface HistorialValor {
    fecha: Date;
    valor: number;
    observacion: string;
}

export interface Valuation {
    id: number;
    propiedad: string;
    tasador: string; // Quién la hizo
    fechaSolicitud: Date;
    fechaTasacion?: Date; // Puede ser null si está pendiente
    valorMercado: number;
    valorAnterior?: number; // Para calcular si subió o bajó
    estado: 'SOLICITADA' | 'EN_PROCESO' | 'FINALIZADA' | 'VENCIDA';
    documentos: Documento[];
    historial: HistorialValor[]; // Para la línea de tiempo
}