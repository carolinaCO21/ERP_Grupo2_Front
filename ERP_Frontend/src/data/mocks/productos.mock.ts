import { ProductoDTO } from '../../domain/dtos/producto.dto';
import { ProductoProveedorDTO } from '../../domain/dtos/producto-proveedor.dto';

export const PRODUCTOS_MOCK: ProductoDTO[] = [
  { id: 10, codigoProducto: 'TOR-M8', nombre: 'Tornillo M8', categoria: 'Ferretería', unidadMedida: 'ud', precio: 1.0, stockActual: 500 },
  { id: 11, codigoProducto: 'TUE-M8', nombre: 'Tuerca M8', categoria: 'Ferretería', unidadMedida: 'ud', precio: 0.8, stockActual: 1000 },
  { id: 20, codigoProducto: 'CABLE-1', nombre: 'Cable 1m', categoria: 'Eléctrico', unidadMedida: 'ud', precio: 2.5, stockActual: 200 }
];

export const PRODUCTOS_PROVEEDOR_MOCK: ProductoProveedorDTO[] = [
  { idProducto: 10, codigoProducto: 'TOR-M8', nombreProducto: 'Tornillo M8', precioUnitario: 1.0 },
  { idProducto: 11, codigoProducto: 'TUE-M8', nombreProducto: 'Tuerca M8', precioUnitario: 0.9 },
  { idProducto: 20, codigoProducto: 'CABLE-1', nombreProducto: 'Cable 1m', precioUnitario: 2.2 }
];
