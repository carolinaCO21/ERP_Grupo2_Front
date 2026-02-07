export class Proveedor {
  constructor(
    public id: number,
    public nombreEmpresa: string,
    public cif: string,
    public direccion: string,
    public ciudad: string,
    public provincia: string,
    public codigoPostal: string,
    public telefono: string,
    public email: string,
    public activo: boolean
  ) {}
}
