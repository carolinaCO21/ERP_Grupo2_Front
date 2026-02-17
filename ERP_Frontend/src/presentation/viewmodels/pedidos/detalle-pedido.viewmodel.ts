import { Injectable, inject, signal, computed } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PedidoDetailDTO } from '../../../domain/dtos/pedido-detail.dto';
import { EstadoPedido, ESTADO_PEDIDO_LABEL } from '../../../domain/enums/estado-pedido.enum';
import { GetPedidoByIdUseCase } from '../../../domain/usecases/pedidos/get-pedido-by-id.usecase';
import { UpdatePedidoUseCase } from '../../../domain/usecases/pedidos/update-pedido.usecase';

@Injectable()
export class DetallePedidoViewModel {
  private getPedidoByIdUseCase = inject(GetPedidoByIdUseCase);
  private updatePedidoUseCase = inject(UpdatePedidoUseCase);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Signals - Estado
  pedido = signal<PedidoDetailDTO | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  // Signals - Acciones
  isCambiandoEstado = signal(false);

  // Computed signals - Información derivada
  numeroPedido = computed(() => this.pedido()?.numeroPedido || '');

  estado = computed(() => this.pedido()?.estado || '');

  estadoLabel = computed(() => ESTADO_PEDIDO_LABEL[this.estado()] || this.estado());

  estadoBadgeClass = computed(() => {
    const estado = this.estado();
    switch (estado) {
      case EstadoPedido.PENDIENTE: return 'badge-warning';
      case EstadoPedido.APROBADO: return 'badge-info';
      case EstadoPedido.EN_PROCESO: return 'badge-primary';
      case EstadoPedido.ENVIADO: return 'badge-success';
      case EstadoPedido.RECIBIDO: return 'badge-success';
      case EstadoPedido.CANCELADO: return 'badge-danger';
      default: return 'badge-secondary';
    }
  });

  fechaFormateada = computed(() => {
    const pedido = this.pedido();
    if (!pedido) return '';
    return new Date(pedido.fechaPedido).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  });

  // Computed signals - Cálculos financieros (del DTO)
  subtotal = computed(() => this.pedido()?.subtotal || 0);

  totalImpuestos = computed(() => this.pedido()?.impuestos || 0);

  total = computed(() => this.pedido()?.total || 0);

  // Computed signals - Información del proveedor
  nombreProveedor = computed(() => this.pedido()?.nombreProveedor || '');

  // Computed - Siguiente estado en el flujo (no cancelar)
  siguienteEstado = computed<EstadoPedido | null>(() => {
    const estado = this.estado() as EstadoPedido;
    switch (estado) {
      case EstadoPedido.PENDIENTE:
        return EstadoPedido.APROBADO;
      case EstadoPedido.APROBADO:
        return EstadoPedido.EN_PROCESO;
      case EstadoPedido.EN_PROCESO:
        return EstadoPedido.ENVIADO;
      case EstadoPedido.ENVIADO:
        return EstadoPedido.RECIBIDO;
      default:
        return null;
    }
  });

  siguienteEstadoLabel = computed(() => {
    const siguiente = this.siguienteEstado();
    return siguiente ? ESTADO_PEDIDO_LABEL[siguiente] || siguiente : '';
  });

  // Computed - Se puede cancelar el pedido
  puedeCancelar = computed(() => {
    const estado = this.estado() as EstadoPedido;
    return estado === EstadoPedido.PENDIENTE || estado === EstadoPedido.APROBADO;
  });

  // Computed - Es estado final
  esEstadoFinal = computed(() => {
    const estado = this.estado() as EstadoPedido;
    return estado === EstadoPedido.RECIBIDO || estado === EstadoPedido.CANCELADO;
  });

  // Computed - Se puede editar (solo en Pendiente)
  puedeEditar = computed(() => {
    return this.estado() === EstadoPedido.PENDIENTE;
  });

  // Computed - Se puede eliminar (solo en Pendiente)
  puedeEliminar = computed(() => {
    return this.estado() === EstadoPedido.PENDIENTE;
  });

  async init(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.cargarPedido(Number(id));
    }
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

  async avanzarEstado(): Promise<void> {
    const siguiente = this.siguienteEstado();
    if (!siguiente) return;
    await this.cambiarEstado(siguiente);
  }

  async cancelarPedido(): Promise<void> {
    if (!this.puedeCancelar()) return;
    await this.cambiarEstado(EstadoPedido.CANCELADO);
  }

  async cambiarEstado(nuevoEstado: EstadoPedido): Promise<void> {
    const pedido = this.pedido();
    if (!pedido) return;

    const confirmacion = confirm(
      `¿Está seguro de cambiar el estado a "${nuevoEstado}"?`
    );

    if (!confirmacion) return;

    this.isCambiandoEstado.set(true);
    this.errorMessage.set('');

    try {
      await this.updatePedidoUseCase.execute({
        id: pedido.id,
        estado: nuevoEstado,
        direccionEntrega: pedido.direccionEntrega
      });

      await this.cargarPedido(pedido.id);
    } catch (error: any) {
      this.errorMessage.set(error.message || 'Error al cambiar el estado');
    } finally {
      this.isCambiandoEstado.set(false);
    }
  }

  volver(): void {
    this.router.navigate(['/home/pedidos/listado']);
  }

  editar(): void {
    const pedido = this.pedido();
    if (pedido) {
      this.router.navigate(['/home/pedidos/editar', pedido.id]);
    }
  }

  // Métodos auxiliares para cálculos de líneas individuales
  calcularSubtotalLinea(cantidad: number, precioUnitario: number): number {
    return cantidad * precioUnitario;
  }

  calcularIvaLinea(cantidad: number, precioUnitario: number, ivaPorcentaje: number): number {
    const subtotal = this.calcularSubtotalLinea(cantidad, precioUnitario);
    return subtotal * (ivaPorcentaje / 100);
  }

  calcularTotalLinea(cantidad: number, precioUnitario: number, ivaPorcentaje: number): number {
    return this.calcularSubtotalLinea(cantidad, precioUnitario) +
           this.calcularIvaLinea(cantidad, precioUnitario, ivaPorcentaje);
  }
}
