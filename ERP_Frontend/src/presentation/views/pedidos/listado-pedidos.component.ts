import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LayoutMainComponent } from '../../../components/layouts/layout-main/layout-main.component';
import { PedidoCardComponent } from '../../../components/pedido-card/pedido-card.component';
import { ListadoPedidosViewModel } from '../../../viewmodels/listado-pedidos.viewmodel';

@Component({
  selector: 'app-listado-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LayoutMainComponent,
    PedidoCardComponent
  ],
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.css'],
  providers: [ListadoPedidosViewModel]
})
export class ListadoPedidosComponent implements OnInit {
  vm = inject(ListadoPedidosViewModel);

  async ngOnInit(): Promise<void> {
    await this.vm.cargarPedidos();
  }

  async onEliminarPedido(id: number): Promise<void> {
    await this.vm.eliminarPedido(id);
  }

  onFiltrarEstado(estado: string): void {
    this.vm.filtrarPorEstado(estado);
  }

  onBuscar(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    this.vm.filtrarPorBusqueda(input.value);
  }

  onLimpiarFiltros(): void {
    this.vm.limpiarFiltros();
  }
}