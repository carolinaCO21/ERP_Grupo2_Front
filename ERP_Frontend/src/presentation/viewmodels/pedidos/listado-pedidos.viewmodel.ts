import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GetPedidosUseCase } from '../../../application/usecases/pedidos/get-pedidos.usecase';
import { GetPedidosByProveedorUseCase } from '../../../application/usecases/pedidos/get-pedidos-by-proveedor.usecase';
import { GetPedidosByEstadoUseCase } from '../../../application/usecases/pedidos/get-pedidos-by-estado.usecase';
import { DeletePedidoUseCase } from '../../../application/usecases/pedidos/delete-pedido.usecase';
import { GetProveedoresUseCase } from '../../../application/usecases/proveedores/get-proveedores.usecase';
import { PedidoUIModel } from '../../models/pedido-ui.model';
import { ProveedorDTO } from '../../../domain/dtos/proveedor.dto';
import { EstadoPedido } from '../../../domain/enums/estado-pedido.enum';

@Injectable()
export class ListadoPedidosViewModel {
  private getPedidosUseCase = inject(GetPedidosUseCase);
  private getPedidosByProveedorUseCase = inject(GetPedidosByProveedorUseCase);
  private getPedidosByEstadoUseCase = inject(GetPedidosByEstadoUseCase);
  private deletePedidoUseCase = inject(DeletePedidoUseCase);
  private getProveedoresUseCase = inject(GetProveedoresUseCase);
  private router = inject(Router);
  
  // Signals
  pedidos = signal<PedidoUIModel[]>([]);
  proveedores = signal<ProveedorDTO[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');
  
  // Filtros
  filtroEstado = signal<string>('');
  filtroProveedor = signal<number | null>(null);
  
  async init(): Promise<void> {
    await Promise.all([
      this.cargarPedidos(),
      this.cargarProveedores()
    ]);
  }
  
  async cargarPedidos(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    try {
      const pedidosDTO = await this.getPedidosUseCase.execute();
      const pedidosUI = pedidosDTO.map(p => this.toUIModel(p));
      this.pedidos.set(pedidosUI);
    } catch (error: any) {
      this.errorMessage.set(error.message);
    } finally {
      this.isLoading.set(false);
    }
  }
  
  async cargarProveedores(): Promise<void> {
    try {
      const proveedores = await this.getProveedoresUseCase.execute();
      this.proveedores.set(proveedores);
    } catch (error) {
      console.error('Error al cargar proveedores', error);
    }
  }
  
  async filtrarPorEstado(estado: string): Promise<void> {
    this.filtroEstado.set(estado);
    this.isLoading.set(true);
    
    try {
      const pedidosDTO = await this.getPedidosByEstadoUseCase.execute(estado);
      const pedidosUI = pedidosDTO.map(p => this.toUIModel(p));
      this.pedidos.set(pedidosUI);
    } catch (error: any) {
      this.errorMessage.set(error.message);
    } finally {
      this.isLoading.set(false);
    }
  }
  
  async filtrarPorProveedor(idProveedor: number): Promise<void> {
    this.filtroProveedor.set(idProveedor);
    this.isLoading.set(true);
    
    try {
      const pedidosDTO = await this.getPedidosByProveedorUseCase.execute(idProveedor);
      const pedidosUI = pedidosDTO.map(p => this.toUIModel(p));
      this.pedidos.set(pedidosUI);
    } catch (error: any) {
      this.errorMessage.set(error.message);
    } finally {
      this.isLoading.set(false);
    }
  }
  
  async limpiarFiltros(): Promise<void> {
    this.filtroEstado.set('');
    this.filtroProveedor.set(null);
    await this.cargarPedidos();
  }
  
  async eliminarPedido(id: number): Promise<void> {
    if (!confirm('¿Está seguro de eliminar este pedido?')) {
      return;
    }
    
    try {
      await this.deletePedidoUseCase.execute(id);
      await this.cargarPedidos();
    } catch (error: any) {
      this.errorMessage.set(error.message);
    }
  }
  
  async verDetalle(id: number): Promise<void> {
    await this.router.navigate(['/home/pedidos/detalle', id]);
  }
  
  async editarPedido(id: number): Promise<void> {
    await this.router.navigate(['/home/pedidos/editar', id]);
  }
  
  async nuevoPedido(): Promise<void> {
    await this.router.navigate(['/home/pedidos/nuevo']);
  }
  
  private toUIModel(pedido: any): PedidoUIModel {
    return {
      ...pedido,
      estadoBadgeClass: this.getEstadoBadgeClass(pedido.estado),
      fechaFormateada: new Date(pedido.fechaPedido).toLocaleDateString('es-ES'),
      totalFormateado: `${pedido.total.toFixed(2)} €`
    };
  }
  
  private getEstadoBadgeClass(estado: string): string {
    switch (estado) {
      case EstadoPedido.PENDIENTE:
        return 'badge-warning';
      case EstadoPedido.APROBADO:
        return 'badge-info';
      case EstadoPedido.EN_PROCESO:
        return 'badge-primary';
      case EstadoPedido.ENVIADO:
        return 'badge-success';
      case EstadoPedido.RECIBIDO:
        return 'badge-success';
      case EstadoPedido.CANCELADO:
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }
}