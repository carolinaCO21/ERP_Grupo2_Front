import { ProductoProveedorDTO } from '../../domain/dtos/producto-proveedor.dto';

export const PRODUCTOS_POR_PROVEEDOR_MOCK: Record<number, ProductoProveedorDTO[]> = {
  1: [
    { idProducto: 10, codigoProducto: 'TOR-M8', nombreProducto: 'Tornillo M8', precioUnitario: 1.0 },
    { idProducto: 11, codigoProducto: 'TUE-M8', nombreProducto: 'Tuerca M8', precioUnitario: 0.9 }
  ],
  2: [
    { idProducto: 20, codigoProducto: 'CABLE-1', nombreProducto: 'Cable 1m', precioUnitario: 2.2 },
    { idProducto: 4, codigoProducto: 'PINT-15', nombreProducto: 'Pintura blanca 15L', precioUnitario: 45.0 }
  ],
  3: [
    { idProducto: 3, codigoProducto: 'CABLE-2.5', nombreProducto: 'Cable 2.5mm', precioUnitario: 1.1 },
    { idProducto: 1, codigoProducto: 'TOR-M8', nombreProducto: 'Tornillo M8', precioUnitario: 0.14 }
  ]
};
