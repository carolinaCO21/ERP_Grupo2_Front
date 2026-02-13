import { Injectable, inject } from '@angular/core';
import { BaseApiService } from '../api/base-api.service';
import { FirebaseAuthService } from '../../core/services/firebase-auth.service';
import { UsuarioDTO } from '../../domain/dtos/usuario.dto';

/**
 * Repositorio para la gestión de usuarios y autenticación
 * Combina Firebase Authentication con la API del backend
 */
@Injectable({
  providedIn: 'root'
})
export class UsuarioRepository {
  private firebaseAuth = inject(FirebaseAuthService);
  private api = inject(BaseApiService);

  /**
   * Realiza el login del usuario
   * 1. Autentica con Firebase
   * 2. Obtiene el token de Firebase
   * 3. Busca el usuario en la BD por email
   * 4. Guarda token y datos del usuario
   * 
   * @param email Email del usuario
   * @param password Contraseña del usuario
   * @returns Datos del usuario autenticado
   */
  async login(email: string, password: string): Promise<UsuarioDTO> {
    try {
      // 1. Autentica con Firebase
      const userCredential = await this.firebaseAuth.signIn(email, password);
      
      // 2. Obtiene el token de Firebase
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('authToken', token);
      
      // 3. Busca el usuario en la BD por email
      // Nota: Este endpoint debe existir en el backend
      const response = await this.api.get<UsuarioDTO>(`/usuarios/email/${email}`);
      
      // 4. Guarda datos del usuario en localStorage
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      
      return response.data;
    } catch (error: any) {
      // Limpia datos en caso de error
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      throw new Error(error.message || 'Error en el proceso de autenticación');
    }
  }

  /**
   * Cierra la sesión del usuario
   * Limpia Firebase Auth y localStorage
   */
  async logout(): Promise<void> {
    await this.firebaseAuth.signOut();
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }

  /**
   * Obtiene un usuario por su ID
   * GET /api/usuarios/{id}
   * @param id Identificador del usuario
   * @returns Datos del usuario
   */
  async getUsuarioPorId(id: number): Promise<UsuarioDTO> {
    const response = await this.api.get<UsuarioDTO>(`/usuarios/${id}`);
    return response.data;
  }

  /**
   * Obtiene el usuario actual desde localStorage
   * @returns Usuario actual o null si no está autenticado
   */
  getCurrentUser(): UsuarioDTO | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Verifica si hay un usuario autenticado
   * @returns true si hay token y usuario en localStorage
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    return !!token && !!user;
  }
}