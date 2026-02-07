import { Injectable, inject, signal, computed } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetPedidoByIdUseCase } from '../../../domain/usecases/pedidos/get-pedido-by-id.usecase';
import { PedidoDetailDTO } from '../../../domain/dtos/pedido-detail.dto';
import { EstadoPedido } from '../../../domain/enums/estado-pedido.enum';

@Injectable()
export class DetallePedidoViewModel {
  private getPedidoByIdUseCase = inject(GetPedidoByIdUseCase);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  // Signals - Estado
  pedido = signal<PedidoDetailDTO | null>(null);
  isLoading = signal(false);
  errorMessage = signal('');
  
  // Computed signals
  totalLineas = computed(() => {
    return this.pedido()?.lineasPedido.length || 0;
  });
  
  estadoBadgeClass = computed(() => {
    const estado = this.pedido()?.estado;
    if (!estado) return 'badge-secondary';
    
    const estadoMap: Record<string, string> = {
      [EstadoPedido.PENDIENTE]: 'badge-warning',
      [EstadoPedido.APROBADO]: 'badge-info',
      [EstadoPedido.EN_PROCESO]: 'badge-primary',
      [EstadoPedido.ENVIADO]: 'badge-success',
      [EstadoPedido.RECIBIDO]: 'badge-success',
      [EstadoPedido.CANCELADO]: 'badge-danger'
    };
    
    return estadoMap[estado] || 'badge-secondary';
  });
  
  async init(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.errorMessage.set('ID de pedido no válido');
      return;
    }
    
    await this.cargarPedido(Number(idParam));
  }
  
  async cargarPedido(id: number): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    try {
      const pedido = await this.getPedidoByIdUseCase.execute(id);
      this.pedido.set(pedido);
    } catch (error: any) {
      this.errorMessage.set(error.message || 'Error al cargar el pedido');
    } finally {
      this.isLoading.set(false);
    }
  }
  
  async editarPedido(): Promise<void> {
    const pedidoId = this.pedido()?.id;
    if (pedidoId) {
      await this.router.navigate(['/home/pedidos/editar', pedidoId]);
    }
  }
  
  async volver(): Promise<void> {
    await this.router.navigate(['/home/pedidos']);
  }
}
