import { Injectable, inject } from '@angular/core';
import { UsuarioRepository } from '../../../data/repositories/usuario.repository';
import { UsuarioDTO } from '../../dtos/usuario.dto';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  private usuarioRepository = inject(UsuarioRepository);

  async execute(email: string, password: string): Promise<UsuarioDTO> {
    return await this.usuarioRepository.login(email, password);
  }
}