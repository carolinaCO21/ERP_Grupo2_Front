import { Injectable, inject } from '@angular/core';
import { UsuarioRepository } from '../../../data/repositories/usuario.repository';

@Injectable({ providedIn: 'root' })
export class LogoutUseCase {
  private usuarioRepository = inject(UsuarioRepository);

  async execute(): Promise<void> {
    await this.usuarioRepository.logout();
  }
}