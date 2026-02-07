import { UsuarioDTO } from '../../domain/dtos/usuario.dto';

export interface UsuarioUIModel extends UsuarioDTO {
  nombreCompleto: string;
  rolBadgeClass: string;
}