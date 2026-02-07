import { PedidoListDTO } from '../../domain/dtos/pedido-list.dto';
import { PedidoDetailDTO } from '../../domain/dtos/pedido-detail.dto';
import { LineaPedidoDTO } from '../../domain/dtos/linea-pedido.dto';

export const PEDIDOS_LIST_MOCK: PedidoListDTO[] = [
  { id: 1, numeroPedido: 'PED-2026-00001', nombreProveedor: 'Proveedora S.A.', fechaPedido: new Date(), estado: 'Pendiente', total: 150.0 },
  { id: 2, numeroPedido: 'PED-2026-00002', nombreProveedor: 'Distribuciones X', fechaPedido: new Date(), estado: 'Aprobado', total: 320.5 },
  { id: 3, numeroPedido: 'PED-2026-00003', nombreProveedor: 'Proveedora S.A.', fechaPedido: new Date(), estado: 'Enviado', total: 75.75 }
];

const lineas1: LineaPedidoDTO[] = [
  { id: 1, idProducto: 10, nombreProducto: 'Tornillo M8', codigoProducto: 'TOR-M8', cantidad: 50, precioUnitario: 1.0, subtotal: 50.0, ivaPorcentaje: 21, totalLinea: 60.5 },
  { id: 2, idProducto: 11, nombreProducto: 'Tuerca M8', codigoProducto: 'TUE-M8', cantidad: 75, precioUnitario: 1.0, subtotal: 75.0, ivaPorcentaje: 21, totalLinea: 90.75 }
];

const lineas2: LineaPedidoDTO[] = [
  { id: 3, idProducto: 20, nombreProducto: 'Cable 1m', codigoProducto: 'CABLE-1', cantidad: 10, precioUnitario: 2.2, subtotal: 22.0, ivaPorcentaje: 21, totalLinea: 26.62 },
  { id: 4, idProducto: 10, nombreProducto: 'Tornillo M8', codigoProducto: 'TOR-M8', cantidad: 100, precioUnitario: 1.0, subtotal: 100.0, ivaPorcentaje: 21, totalLinea: 121.0 }
];

export const PEDIDOS_DETAIL_MOCK: PedidoDetailDTO[] = [
  {
    id: 1,
    numeroPedido: 'PED-2026-00001',
    idProveedor: 1,
    nombreProveedor: 'Proveedora S.A.',
    idUsuario: 1,
    nombreUsuario: 'Juan Pérez',
    fechaPedido: new Date(),
    estado: 'Pendiente',
    subtotal: 125.0,
    impuestos: 25.0,
    total: 150.0,
    direccionEntrega: 'C/ Falsa 123, Ciudad',
    lineasPedido: lineas1
  },
  {
    id: 2,
    numeroPedido: 'PED-2026-00002',
    idProveedor: 2,
    nombreProveedor: 'Distribuciones X',
    idUsuario: 2,
    nombreUsuario: 'María López',
    fechaPedido: new Date(),
    estado: 'Aprobado',
    subtotal: 272.0,
    impuestos: 48.5,
    total: 320.5,
    direccionEntrega: 'Pol. Ind. Av. 5, Nave 3',
    lineasPedido: lineas2
  }
];
