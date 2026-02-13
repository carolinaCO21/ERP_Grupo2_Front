import { Injectable, inject } from '@angular/core';
import { BaseApiService } from '../api/base-api.service';
import { ProveedorDTO } from '../../domain/dtos/proveedor.dto';
import { ProductoProveedorDTO } from '../../domain/dtos/producto-proveedor.dto';
import { API_CONFIG } from '../../core/config/api.config';

/**
 * Repositorio para la gestión de proveedores usando la API REST
 * Endpoints base: /api/proveedores
 */
@Injectable({ providedIn: 'root' })
export class ProveedorRepository {
  private api = inject(BaseApiService);
  private endpoint = API_CONFIG.endpoints.proveedores;

  /**
   * Obtiene todos los proveedores activos
   * GET /api/proveedores
   * @returns Lista de proveedores activos
   */
  async getListadoProveedores(): Promise<ProveedorDTO[]> {
    const response = await this.api.get<ProveedorDTO[]>(this.endpoint);
    return response.data;
  }

  /**
   * Obtiene un proveedor por su ID
   * GET /api/proveedores/{id}
   * @param id Identificador del proveedor
   * @returns Datos del proveedor
   */
  async getProveedorPorId(id: number): Promise<ProveedorDTO> {
    const response = await this.api.get<ProveedorDTO>(`${this.endpoint}/${id}`);
    return response.data;
  }

  /**
   * Obtiene los productos ofrecidos por un proveedor
   * GET /api/proveedores/{id}/productos
   * @param id Identificador del proveedor
   * @returns Lista de productos del proveedor con precios específicos
   */
  async getProductosPorProveedor(id: number): Promise<ProductoProveedorDTO[]> {
    const response = await this.api.get<ProductoProveedorDTO[]>(
      `${this.endpoint}/${id}/productos`
    );
    return response.data;
  }
}