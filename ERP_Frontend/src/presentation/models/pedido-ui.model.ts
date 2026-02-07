import { PedidoListDTO } from '../../domain/dtos/pedido-list.dto';

export interface PedidoUIModel extends PedidoListDTO {
  estadoBadgeClass: string;
  fechaFormateada: string;
  totalFormateado: string;
}