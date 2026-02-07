import { LineaPedidoCreateDTO } from './linea-pedido-create.dto';

export interface PedidoCreateDTO {
  idProveedor: number;
  idUsuario: number;
  direccionEntrega: string;
  lineasPedido: LineaPedidoCreateDTO[];
}
