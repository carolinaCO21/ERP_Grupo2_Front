import { Injectable } from '@angular/core';
import { PedidoListDTO } from '../../domain/dtos/pedido-list.dto';
import { GetPedidosUseCase } from '../../application/usecases/pedidos/get-pedidos.usecase';
import { GetPedidosPorProveedorUseCase } from '../../application/usecases/pedidos/get-pedidos-por-proveedor.usecase';
import { GetPedidosPorEstadoUseCase } from '../../application/usecases/pedidos/get-pedidos-por-estado.usecase';
import { EliminarPedidoUseCase } from '../../application/usecases/pedidos/eliminar-pedido.usecase';
import { EstadoPedido } from '../../domain/enums/estado-pedido.enum';

@Injectable({
  providedIn: 'root'
})
export class ListadoPedidosViewModel {
  pedidos: PedidoListDTO[] = [];
  pedidosFiltrados: PedidoListDTO[] = [];
  cargando: boolean = false;
  error: string = '';
  
  // Filtros
  filtroEstado: string = '';
  filtroProveedor: number | null = null;
  filtroBusqueda: string = '';

  constructor(
    private getPedidosUseCase: GetPedidosUseCase,
    private getPedidosPorProveedorUseCase: GetPedidosPorProveedorUseCase,
    private getPedidosPorEstadoUseCase: GetPedidosPorEstadoUseCase,
    private eliminarPedidoUseCase: EliminarPedidoUseCase
  ) {}

  async cargarPedidos(): Promise<void> {
    this.cargando = true;
    this.error = '';

    try {
      this.pedidos = await this.getPedidosUseCase.execute();
      this.aplicarFiltros();
    } catch (error) {
      this.error = 'Error al cargar los pedidos';
      console.error('Error al cargar pedidos:', error);
    } finally {
      this.cargando = false;
    }
  }

  async cargarPedidosPorProveedor(idProveedor: number): Promise<void> {
    this.cargando = true;
    this.error = '';

    try {
      this.pedidos = await this.getPedidosPorProveedorUseCase.execute(idProveedor);
      this.filtroProveedor = idProveedor;
      this.aplicarFiltros();
    } catch (error) {
      this.error = 'Error al cargar los pedidos del proveedor';
      console.error('Error:', error);
    } finally {
      this.cargando = false;
    }
  }

  async cargarPedidosPorEstado(estado: string): Promise<void> {
    this.cargando = true;
    this.error = '';

    try {
      this.pedidos = await this.getPedidosPorEstadoUseCase.execute(estado);
      this.filtroEstado = estado;
      this.aplicarFiltros();
    } catch (error) {
      this.error = 'Error al cargar los pedidos por estado';
      console.error('Error:', error);
    } finally {
      this.cargando = false;
    }
  }

  async eliminarPedido(id: number): Promise<void> {
    this.cargando = true;
    this.error = '';

    try {
      const eliminado = await this.eliminarPedidoUseCase.execute(id);
      
      if (eliminado) {
        this.pedidos = this.pedidos.filter(p => p.id !== id);
        this.aplicarFiltros();
      } else {
        this.error = 'No se pudo eliminar el pedido';
      }
    } catch (error) {
      this.error = 'Error al eliminar el pedido';
      console.error('Error al eliminar:', error);
    } finally {
      this.cargando = false;
    }
  }

  filtrarPorEstado(estado: string): void {
    this.filtroEstado = estado;
    this.aplicarFiltros();
  }

  filtrarPorBusqueda(texto: string): void {
    this.filtroBusqueda = texto;
    this.aplicarFiltros();
  }

  limpiarFiltros(): void {
    this.filtroEstado = '';
    this.filtroProveedor = null;
    this.filtroBusqueda = '';
    this.aplicarFiltros();
  }

  private aplicarFiltros(): void {
    let resultado = [...this.pedidos];

    // Filtro por estado
    if (this.filtroEstado) {
      resultado = resultado.filter(p => p.estado === this.filtroEstado);
    }

    // Filtro por búsqueda (número de pedido o proveedor)
    if (this.filtroBusqueda) {
      const busqueda = this.filtroBusqueda.toLowerCase();
      resultado = resultado.filter(p => 
        p.numeroPedido.toLowerCase().includes(busqueda) ||
        p.nombreProveedor.toLowerCase().includes(busqueda)
      );
    }

    this.pedidosFiltrados = resultado;
  }

  obtenerEstadosDisponibles(): string[] {
    return Object.values(EstadoPedido);
  }

  obtenerCantidadPorEstado(estado: string): number {
    return this.pedidos.filter(p => p.estado === estado).length;
  }

  calcularTotalGeneral(): number {
    return this.pedidosFiltrados.reduce((sum, p) => sum + p.total, 0);
  }
}