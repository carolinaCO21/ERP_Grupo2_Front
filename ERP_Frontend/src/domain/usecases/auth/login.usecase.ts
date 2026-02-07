import { Injectable, inject } from '@angular/core';
import { UsuarioMockRepository } from '../../../data/repositories/usuario.repository.mock';
import { UsuarioDTO } from '../../dtos/usuario.dto';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  private usuarioRepository = inject(UsuarioMockRepository);

  async execute(email: string, password: string): Promise<UsuarioDTO> {
    return await this.usuarioRepository.login(email, password);
  }
}
