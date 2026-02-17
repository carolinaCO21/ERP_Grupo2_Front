import { LineaPedidoCreateDTO } from './linea-pedido-create.dto';

export interface PedidoCreateDTO {
  idProveedor: number;
  direccionEntrega: string;
  lineasPedido: LineaPedidoCreateDTO[];
}
