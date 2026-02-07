export interface LineaPedidoDTO {
  id: number;
  idProducto: number;
  nombreProducto: string;
  codigoProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  ivaPorcentaje: number;
  totalLinea: number;
}
