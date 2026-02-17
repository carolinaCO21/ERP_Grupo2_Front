import { Injectable, inject, signal, computed } from '@angular/core';
import { GetPedidosUseCase } from '../../../domain/usecases/pedidos/get-pedidos.usecase';
import { PedidoListDTO } from '../../../domain/dtos/pedido-list.dto';
import { EstadoPedido } from '../../../domain/enums/estado-pedido.enum';

@Injectable()
export class DashboardViewModel {
  private getPedidosUseCase = inject(GetPedidosUseCase);

  pedidos = signal<PedidoListDTO[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  // Stats computados desde los pedidos reales
  pedidosActivos = computed(() => {
    const activos = [EstadoPedido.PENDIENTE, EstadoPedido.APROBADO, EstadoPedido.EN_PROCESO, EstadoPedido.ENVIADO];
    return this.pedidos().filter(p => activos.includes(p.estado as EstadoPedido)).length;
  });

  pedidosCompletados = computed(() =>
    this.pedidos().filter(p => p.estado === EstadoPedido.RECIBIDO).length
  );

  pedidosPendientes = computed(() =>
    this.pedidos().filter(p => p.estado === EstadoPedido.PENDIENTE).length
  );

  totalFacturado = computed(() => {
    const total = this.pedidos().reduce((sum, p) => sum + (p.total || 0), 0);
    return total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' \u20ac';
  });

  // Actividad reciente: ultimos 5 pedidos ordenados por fecha
  actividadReciente = computed(() => {
    return [...this.pedidos()]
      .sort((a, b) => new Date(b.fechaPedido).getTime() - new Date(a.fechaPedido).getTime())
      .slice(0, 5)
      .map(p => ({
        texto: `Pedido ${p.numeroPedido} - ${p.nombreProveedor}`,
        estado: p.estado,
        fecha: this.formatearTiempo(new Date(p.fechaPedido)),
        dotClass: this.getDotClass(p.estado),
      }));
  });

  async init(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      const pedidos = await this.getPedidosUseCase.execute();
      this.pedidos.set(pedidos);
    } catch (error: any) {
      this.errorMessage.set(error.message || 'Error al cargar datos del dashboard');
    } finally {
      this.isLoading.set(false);
    }
  }

  private formatearTiempo(fecha: Date): string {
    const ahora = new Date();
    const diff = ahora.getTime() - fecha.getTime();
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const dias = Math.floor(horas / 24);

    if (horas < 1) return 'Hace menos de 1 hora';
    if (horas < 24) return `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
    if (dias < 7) return `Hace ${dias} dia${dias > 1 ? 's' : ''}`;
    return fecha.toLocaleDateString('es-ES');
  }

  private getDotClass(estado: string): string {
    switch (estado) {
      case EstadoPedido.RECIBIDO: return 'dot-success';
      case EstadoPedido.PENDIENTE: return 'dot-warning';
      case EstadoPedido.CANCELADO: return 'dot-danger';
      default: return 'dot-info';
    }
  }
}
