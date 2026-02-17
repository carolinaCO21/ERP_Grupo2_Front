import { Injectable, inject, signal, computed } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PedidoDetailDTO } from '../../../domain/dtos/pedido-detail.dto';
import { EstadoPedido } from '../../../domain/enums/estado-pedido.enum';
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
  mostrarModalCambioEstado = signal(false);
  nuevoEstado = signal<EstadoPedido>(EstadoPedido.PENDIENTE);
  
  // Computed signals - Información derivada
  numeroPedido = computed(() => this.pedido()?.numeroPedido || '');
  
  estado = computed(() => this.pedido()?.estado || '');
  
  estadoBadgeClass = computed(() => {
    const estado = this.estado();
    const clases: { [key: string]: string } = {
      'PENDIENTE': 'badge-warning',
      'APROBADO': 'badge-info',
      'EN_PROCESO': 'badge-primary',
      'ENVIADO': 'badge-success',
      'RECIBIDO': 'badge-success',
      'CANCELADO': 'badge-danger'
    };
    return clases[estado] || 'badge-secondary';
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
  
  // Computed signals - Estados disponibles para cambio
  puedeEditarEstado = computed(() => {
    const estado = this.estado();
    return estado !== EstadoPedido.CANCELADO && estado !== EstadoPedido.RECIBIDO;
  });
  
  estadosDisponibles = computed(() => {
    const estadoActual = this.estado() as EstadoPedido;
    
    switch (estadoActual) {
      case EstadoPedido.PENDIENTE:
        return [EstadoPedido.APROBADO, EstadoPedido.CANCELADO];
      case EstadoPedido.APROBADO:
        return [EstadoPedido.EN_PROCESO, EstadoPedido.CANCELADO];
      case EstadoPedido.EN_PROCESO:
        return [EstadoPedido.ENVIADO, EstadoPedido.CANCELADO];
      case EstadoPedido.ENVIADO:
        return [EstadoPedido.RECIBIDO];
      default:
        return [];
    }
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
  
  async cambiarEstado(nuevoEstado: EstadoPedido): Promise<void> {
    const pedido = this.pedido();
    if (!pedido) return;
    
    this.isCambiandoEstado.set(true);
    this.errorMessage.set('');
    
    try {
      await this.updatePedidoUseCase.execute({
        id: pedido.id,
        estado: nuevoEstado,
        direccionEntrega: pedido.direccionEntrega,
        lineasPedido: pedido.lineasPedido.map(l => ({
          idProducto: l.idProducto,
          cantidad: l.cantidad,
          precioUnitario: l.precioUnitario,
          ivaPorcentaje: l.ivaPorcentaje
        }))
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
  
  abrirModalCambioEstado(): void {
    const estados = this.estadosDisponibles();
    if (estados.length > 0) {
      this.nuevoEstado.set(estados[0]);
      this.mostrarModalCambioEstado.set(true);
    }
  }
  
  cerrarModalCambioEstado(): void {
    this.mostrarModalCambioEstado.set(false);
  }
  
  async confirmarCambioEstado(): Promise<void> {
    await this.cambiarEstado(this.nuevoEstado());
    this.cerrarModalCambioEstado();
  }
  
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