import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../../domain/dtos/usuario.dto';
import { USUARIOS_MOCK } from '../mocks/usuarios.mock';

@Injectable({ providedIn: 'root' })
export class UsuarioMockRepository {
  private usuarios: UsuarioDTO[] = [...USUARIOS_MOCK];

  private delay(ms = 200) { return new Promise(resolve => setTimeout(resolve, ms)); }

  async login(email: string, password: string): Promise<UsuarioDTO> {
    await this.delay();
    const found = this.usuarios.find(u => u.email === email);
    if (!found) throw new Error('Credenciales inválidas (mock)');

    // Simula token simple
    const token = `mock-token-${found.id}`;
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(found));
    return found;
  }

  async logout(): Promise<void> {
    await this.delay();
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }

  async getUsuarioPorId(id: number): Promise<UsuarioDTO> {
    await this.delay();
    const found = this.usuarios.find(u => u.id === id);
    if (!found) throw new Error('Usuario no encontrado');
    return found;
  }

  getCurrentUser(): UsuarioDTO | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
}
