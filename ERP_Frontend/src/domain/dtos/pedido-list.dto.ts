export interface PedidoListDTO {
  id: number;
  numeroPedido: string;
  nombreProveedor: string;
  fechaPedido: Date;
  estado: string;
  total: number;
}
