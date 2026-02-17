import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../api/base-api.service';
import { UsuarioDTO } from '../../domain/dtos/usuario.dto';
import { API_CONFIG } from '../../core/config/api.config';
import { lastValueFrom } from 'rxjs';

/**
 * Repositorio para la gestión de usuarios y autenticación
 * Combina Firebase Authentication con la API del backend
 */
@Injectable({
  providedIn: 'root'
})
export class UsuarioRepository {
  private http = inject(HttpClient);
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
      // Llamar al endpoint del backend: POST /api/auth/login
      const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth}/login`;
      const resp = await lastValueFrom(this.http.post<any>(url, { Email: email, Password: password }));
      console.debug('Auth login response raw:', resp);

      // Resp expected: { Token, RefreshToken, ExpiresIn, User }
      const token = resp?.Token || resp?.token || '';
      const user = resp?.User || resp?.user || null;

      if (!token || !user) {
        // limpieza por si acaso
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        throw new Error('Credenciales inválidas o respuesta inesperada del servidor');
      }

      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(user));

      return user as UsuarioDTO;
    } catch (error: any) {
      // Loguear detalles del error para diagnosticar 500
      console.error('Login error:', error);
      if (error?.error) console.error('Error body:', error.error);
      // Limpia datos en caso de error
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      // Reenviar mensaje más informativo si existe
      const serverMessage = error?.error?.message || error?.message;
      throw new Error(serverMessage || 'Error en el proceso de autenticación');
    }
  }

  /**
   * Cierra la sesión del usuario
   * Limpia Firebase Auth y localStorage
   */
  async logout(): Promise<void> {
    // Solo limpiar localStorage; el backend no requiere endpoint adicional para logout
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
   * Obtiene la información del usuario autenticado usando el endpoint del backend
   * GET /api/auth/me
   */
  async getMe(): Promise<UsuarioDTO> {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth}/me`;
    const resp = await lastValueFrom(this.http.get<any>(url));
    // resp expected: AuthResponse (user info)
    return resp as UsuarioDTO;
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