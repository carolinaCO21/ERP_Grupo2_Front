import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPedidosViewModel } from '../../../viewmodels/pedidos/listado-pedidos.viewmodel';
import { PedidoListComponent } from '../../../components/pedidos/pedido-list/pedido-list.component';

@Component({
  selector: 'app-listado-pedidos',
  standalone: true,
  imports: [CommonModule, PedidoListComponent],
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.scss'],
  providers: [ListadoPedidosViewModel]
})
export class ListadoPedidosComponent implements OnInit {
  vm = inject(ListadoPedidosViewModel);
  
  async ngOnInit() {
    await this.vm.init();
  }
}