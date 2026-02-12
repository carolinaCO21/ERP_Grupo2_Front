import { Injectable, inject } from '@angular/core';
import { BaseApiService } from '../api/base-api.service';
import { ProductoDTO } from '../../domain/dtos/producto.dto';
import { API_CONFIG } from '../../core/config/api.config';

/**
 * Repositorio para la gestión de productos usando la API REST
 * Endpoints base: /api/productos
 */
@Injectable({ providedIn: 'root' })
export class ProductoRepository {
  private api = inject(BaseApiService);
  private endpoint = API_CONFIG.endpoints.productos;

  /**
   * Obtiene todos los productos activos del catálogo
   * GET /api/productos
   * @returns Lista de productos activos
   */
  async getListadoProductos(): Promise<ProductoDTO[]> {
    const response = await this.api.get<ProductoDTO[]>(this.endpoint);
    return response.data;
  }

  /**
   * Obtiene un producto por su ID
   * GET /api/productos/{id}
   * @param id Identificador del producto
   * @returns Datos del producto
   */
  async getProductoPorId(id: number): Promise<ProductoDTO> {
    const response = await this.api.get<ProductoDTO>(`${this.endpoint}/${id}`);
    return response.data;
  }
}