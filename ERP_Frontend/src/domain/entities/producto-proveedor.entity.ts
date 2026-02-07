export class ProductoProveedor {
  constructor(
    public id: number,
    public idProveedor: number,
    public idProducto: number,
    public precioUnitario: number,
    public activo: boolean
  ) {}
}
