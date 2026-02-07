export class Usuario {
  constructor(
    public id: number,
    public firebaseUid: string,
    public email: string,
    public nombre: string,
    public apellidos: string,
    public rol: string,
    public activo: boolean
  ) {}
}
