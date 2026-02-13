import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { API_CONFIG } from '../../core/config/api.config';
import { ApiResponseDTO } from '../../domain/dtos/api-response.dto';

/**
 * Servicio base para realizar llamadas HTTP a la API
 * Convierte Observables a Promises usando async/await
 */
@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl;

  /**
   * Realiza una petición GET a la API
   * @param endpoint Endpoint relativo (ej: '/pedidos', '/proveedores/1')
   * @returns Promise con la respuesta envuelta en ApiResponseDTO
   */
  async get<T>(endpoint: string): Promise<ApiResponseDTO<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    return await lastValueFrom(this.http.get<ApiResponseDTO<T>>(url));
  }

  /**
   * Realiza una petición POST a la API
   * @param endpoint Endpoint relativo
   * @param body Cuerpo de la petición
   * @returns Promise con la respuesta envuelta en ApiResponseDTO
   */
  async post<T>(endpoint: string, body: any): Promise<ApiResponseDTO<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    return await lastValueFrom(
      this.http.post<ApiResponseDTO<T>>(url, body)
    );
  }

  /**
   * Realiza una petición PUT a la API
   * @param endpoint Endpoint relativo
   * @param body Cuerpo de la petición
   * @returns Promise con la respuesta envuelta en ApiResponseDTO
   */
  async put<T>(endpoint: string, body: any): Promise<ApiResponseDTO<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    return await lastValueFrom(
      this.http.put<ApiResponseDTO<T>>(url, body)
    );
  }

  /**
   * Realiza una petición DELETE a la API
   * @param endpoint Endpoint relativo
   * @returns Promise con la respuesta (puede ser vacía para 204 No Content)
   */
  async delete<T>(endpoint: string): Promise<ApiResponseDTO<T> | void> {
    const url = `${this.baseUrl}${endpoint}`;
    return await lastValueFrom(
      this.http.delete<ApiResponseDTO<T>>(url)
    );
  }
}