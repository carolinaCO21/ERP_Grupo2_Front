import { LineaPedidoDTO } from '../../domain/dtos/linea-pedido.dto';

export interface LineaPedidoUIModel extends LineaPedidoDTO {
  subtotalFormateado: string;
  totalLineaFormateado: string;
  tieneError: boolean;
  mensajeError?: string;
}