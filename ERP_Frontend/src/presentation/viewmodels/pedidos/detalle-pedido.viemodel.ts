import { Injectable, inject, signal, computed } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetPedidoByIdUseCase } from '../../../application/usecases/pedidos/get-pedido-by-id.usecase';
import { UpdatePedidoUseCase } from '../../../application/usecases/pedidos/update-pedido.usecase';
import { PedidoDetailDTO } from '../../../domain/dtos/pedido-detail.dto';
import { EstadoPedido } from '../../../domain/enums/estado-pedido.enum';

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
  
  // Computed signals - Cálculos financieros
  subtotal = computed(() => {
    const pedido = this.pedido();
    if (!pedido) return 0;
    
    return pedido.lineasPedido.reduce((sum, linea) => {
      return sum + (linea.cantidad * linea.precioUnitario);
    }, 0);
  });
  
  totalImpuestos = computed(() => {
    const pedido = this.pedido();
    if (!pedido) return 0;
    
    return pedido.lineasPedido.reduce((sum, linea) => {
      const subtotal = linea.cantidad * linea.precioUnitario;
      const iva = subtotal * (linea.ivaPorcentaje / 100);
      return sum + iva;
    }, 0);
  });
  
  total = computed(() => {
    return this.subtotal() + this.totalImpuestos();
  });
  
  // Computed signals - Información del proveedor
  nombreProveedor = computed(() => this.pedido()?.nombreProveedor || '');
  emailProveedor = computed(() => this.pedido()?.emailProveedor || '');
  telefonoProveedor = computed(() => this.pedido()?.telefonoProveedor || '');
  
  // Computed signals - Estados disponibles para cambio
  puedeEditarEstado = computed(() => {
    const estado = this.estado();
    return estado !== EstadoPedido.CANCELADO && estado !== EstadoPedido.RECIBIDO;
  });
  
  estadosDisponibles = computed(() => {
    const estadoActual = this.estado() as EstadoPedido;
    
    // Lógica de transiciones de estado permitidas
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
        direccionEntrega: pedido.direccionEntrega,
        lineasPedido: pedido.lineasPedido.map(l => ({
          idProducto: l.idProducto,
          cantidad: l.cantidad,
          precioUnitario: l.precioUnitario,
          ivaPorcentaje: l.ivaPorcentaje
        }))
      });
      
      // Recargar el pedido para obtener el estado actualizado
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