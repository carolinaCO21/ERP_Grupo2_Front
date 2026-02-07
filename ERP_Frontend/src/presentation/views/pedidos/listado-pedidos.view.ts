import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { PedidoCardComponent } from '../../components/pedido-card/pedido-card.component';
import { ListadoPedidosViewModel } from '../../viewmodels/listado-pedidos.viewmodel';

@Component({
  selector: 'app-listado-pedidos-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HeaderComponent,
    SidebarComponent,
    PedidoCardComponent
  ],
  templateUrl: './listado-pedidos.view.html',
  styleUrls: ['./listado-pedidos.view.css'],
  providers: [ListadoPedidosViewModel]
})
export class ListadoPedidosView implements OnInit {
  constructor(public viewModel: ListadoPedidosViewModel) {}

  async ngOnInit(): Promise<void> {
    await this.viewModel.cargarPedidos();
  }

  async onEliminarPedido(id: number): Promise<void> {
    await this.viewModel.eliminarPedido(id);
  }

  onFiltrarEstado(estado: string): void {
    this.viewModel.filtrarPorEstado(estado);
  }

  onBuscar(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    this.viewModel.filtrarPorBusqueda(input.value);
  }

  onLimpiarFiltros(): void {
    this.viewModel.limpiarFiltros();
  }
}