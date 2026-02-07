import { LineaPedidoDTO } from './linea-pedido.dto';

export interface PedidoDetailDTO {
  id: number;
  numeroPedido: string;
  idProveedor: number;
  nombreProveedor: string;
  idUsuario: number;
  nombreUsuario: string;
  fechaPedido: Date;
  estado: string;
  subtotal: number;
  impuestos: number;
  total: number;
  direccionEntrega: string;
  lineasPedido: LineaPedidoDTO[];
}
