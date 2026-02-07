import { Injectable, inject } from '@angular/core';
import { UsuarioMockRepository } from '../../../data/repositories/usuario.repository.mock';

@Injectable({ providedIn: 'root' })
export class LogoutUseCase {
  private usuarioRepository = inject(UsuarioMockRepository);

  async execute(): Promise<void> {
    return await this.usuarioRepository.logout();
  }
}
