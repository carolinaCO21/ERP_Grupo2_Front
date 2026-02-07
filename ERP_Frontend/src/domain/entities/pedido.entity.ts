export class Pedido {
  constructor(
    public id: number,
    public numeroPedido: string,
    public idProveedor: number,
    public idUsuario: number,
    public fechaPedido: Date,
    public estado: string,
    public subtotal: number,
    public impuestos: number,
    public total: number,
    public direccionEntrega: string
  ) {}
}
