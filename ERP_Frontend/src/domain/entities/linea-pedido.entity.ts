export class LineaPedido {
  constructor(
    public id: number,
    public idPedido: number,
    public idProducto: number,
    public cantidad: number,
    public precioUnitario: number,
    public subtotal: number,
    public ivaPorcentaje: number,
    public totalLinea: number
  ) {}
}
