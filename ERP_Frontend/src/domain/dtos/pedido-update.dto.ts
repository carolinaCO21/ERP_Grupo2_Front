import { LineaPedidoCreateDTO } from './linea-pedido-create.dto';

export interface PedidoUpdateDTO {
  id: number;
  estado: string;
  direccionEntrega: string;
  lineasPedido: LineaPedidoCreateDTO[];
}
