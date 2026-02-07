export class Producto {
  constructor(
    public id: number,
    public codigoProducto: string,
    public nombre: string,
    public descripcion: string,
    public categoria: string,
    public unidadMedida: string,
    public precio: number,
    public stockActual: number,
    public activo: boolean
  ) {}
}
