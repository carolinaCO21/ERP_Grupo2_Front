import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListadoPedidosViewModel } from '../../../viewmodels/pedidos/listado-pedidos.viewmodel';
import { HeaderComponent } from '../../../components/shared/header/header.component';
import { SidebarComponent } from '../../../components/shared/sidebar/sidebar.component';
import { PedidoCardComponent } from '../../../components/pedidos/pedido-card/pedido-card.component';
import { PedidoListDTO } from '../../../../domain/dtos/pedido-list.dto';
import { EstadoPedido } from '../../../../domain/enums/estado-pedido.enum';

@Component({
  selector: 'app-listado-pedidos',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent, PedidoCardComponent],
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.css'],
  providers: [ListadoPedidosViewModel]
})
export class ListadoPedidosComponent implements OnInit {
  viewModel = inject(ListadoPedidosViewModel);

  // Propiedades para el template
  filtroBusqueda = '';
  filtroEstado = '';

  async ngOnInit() {
    await this.viewModel.init();
  }

  get pedidos() {
    return this.viewModel.pedidos();
  }

  get cargando() {
    return this.viewModel.isLoading();
  }

  get error() {
    return this.viewModel.errorMessage();
  }

  get pedidosFiltrados(): PedidoListDTO[] {
    let result = this.pedidos;

    if (this.filtroEstado) {
      result = result.filter(p => p.estado === this.filtroEstado);
    }

    if (this.filtroBusqueda) {
      const busqueda = this.filtroBusqueda.toLowerCase();
      result = result.filter(p =>
        p.numeroPedido.toLowerCase().includes(busqueda) ||
        p.nombreProveedor.toLowerCase().includes(busqueda)
      );
    }

    return result;
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

  onBuscar(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filtroBusqueda = input.value;
  }

  onFiltrarEstado(estado: string): void {
    this.filtroEstado = estado;
  }

  onLimpiarFiltros(): void {
    this.filtroEstado = '';
    this.filtroBusqueda = '';
  }

  async onEliminarPedido(id: number): Promise<void> {
    await this.viewModel.eliminarPedido(id);
  }
}
