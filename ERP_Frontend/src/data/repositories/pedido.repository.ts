import { Injectable, inject } from '@angular/core';
import { BaseApiService } from '../api/base-api.service';
import { PedidoListDTO } from '../../domain/dtos/pedido-list.dto';
import { PedidoDetailDTO } from '../../domain/dtos/pedido-detail.dto';
import { PedidoCreateDTO } from '../../domain/dtos/pedido-create.dto';
import { PedidoUpdateDTO } from '../../domain/dtos/pedido-update.dto';
import { API_CONFIG } from '../../core/config/api.config';

/**
 * Repositorio para la gestión de pedidos usando la API REST
 * Endpoints base: /api/pedidos
 */
@Injectable({ providedIn: 'root' })
export class PedidoRepository {
  private api = inject(BaseApiService);
  private endpoint = API_CONFIG.endpoints.pedidos;

  /**
   * Obtiene todos los pedidos
   * GET /api/pedidos
   * @returns Lista de pedidos en formato resumido
   */
  async getListadoPedidos(): Promise<PedidoListDTO[]> {
    const response = await this.api.get<PedidoListDTO[]>(this.endpoint);
    return response.data;
  }

  /**
   * Obtiene un pedido por su ID
   * GET /api/pedidos/{id}
   * @param id Identificador del pedido
   * @returns Detalle completo del pedido incluyendo líneas
   */
  async getPedidoPorId(id: number): Promise<PedidoDetailDTO> {
    const response = await this.api.get<PedidoDetailDTO>(`${this.endpoint}/${id}`);
    return response.data;
  }

  /**
   * Obtiene los pedidos de un proveedor específico
   * GET /api/pedidos/proveedor/{proveedorId}
   * @param idProveedor Identificador del proveedor
   * @returns Lista de pedidos del proveedor
   */
  async getPedidosPorProveedor(idProveedor: number): Promise<PedidoListDTO[]> {
    const response = await this.api.get<PedidoListDTO[]>(
      `${this.endpoint}/proveedor/${idProveedor}`
    );
    return response.data;
  }

  /**
   * Obtiene los pedidos filtrados por estado
   * GET /api/pedidos/estado/{estado}
   * @param estado Estado del pedido (Pendiente, Aprobado, EnProceso, Enviado, Recibido, Cancelado)
   * @returns Lista de pedidos con el estado indicado
   */
  async getPedidosPorEstado(estado: string): Promise<PedidoListDTO[]> {
    const response = await this.api.get<PedidoListDTO[]>(
      `${this.endpoint}/estado/${estado}`
    );
    return response.data;
  }

  /**
   * Crea un nuevo pedido
   * POST /api/pedidos
   * @param pedidoCreateDto Datos del pedido a crear
   * @returns Detalle del pedido creado
   */
  async insertarPedido(pedidoCreateDto: PedidoCreateDTO): Promise<PedidoDetailDTO> {
    const response = await this.api.post<PedidoDetailDTO>(
      this.endpoint,
      pedidoCreateDto
    );
    return response.data;
  }

  /**
   * Actualiza un pedido existente
   * PUT /api/pedidos
   * @param pedidoUpdateDto Datos de actualización del pedido
   * @returns Detalle del pedido actualizado
   */
  async editarPedido(pedidoUpdateDto: PedidoUpdateDTO): Promise<PedidoDetailDTO> {
    const response = await this.api.put<PedidoDetailDTO>(
      this.endpoint,
      pedidoUpdateDto
    );
    return response.data;
  }

  /**
   * Elimina un pedido (solo si está en estado Pendiente)
   * DELETE /api/pedidos/{id}
   * @param id Identificador del pedido a eliminar
   * @returns true si se eliminó correctamente
   */
  async eliminarPedido(id: number): Promise<boolean> {
    await this.api.delete(`${this.endpoint}/${id}`);
    return true; // Si no lanza error, se eliminó correctamente
  }
}