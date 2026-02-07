import { UsuarioDTO } from '../../domain/dtos/usuario.dto';

export const USUARIOS_MOCK: UsuarioDTO[] = [
  { id: 1, email: 'admin@erp.com', nombre: 'Carlos', apellidos: 'García López', rol: 'Admin', activo: true },
  { id: 2, email: 'usuario@erp.com', nombre: 'María', apellidos: 'Fernández Ruiz', rol: 'Usuario', activo: true },
  { id: 3, email: 'supervisor@erp.com', nombre: 'Juan', apellidos: 'Martínez Sánchez', rol: 'Supervisor', activo: true }
];
