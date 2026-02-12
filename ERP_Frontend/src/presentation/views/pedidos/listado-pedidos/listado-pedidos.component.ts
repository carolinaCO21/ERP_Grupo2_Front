import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// ❌ ELIMINAR: import { FormsModule } from '@angular/forms';
import { ListadoPedidosViewModel } from '../../../viewmodels/pedidos/listado-pedidos.viewmodel';
import { PedidoListComponent } from '../../../components/pedidos/pedido-list/pedido-list.component';

@Component({
  selector: 'app-listado-pedidos',
  standalone: true,
  imports: [CommonModule, PedidoListComponent],  // ✅ Sin FormsModule
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.css'],
  providers: [ListadoPedidosViewModel]
})
export class ListadoPedidosComponent implements OnInit {
  vm = inject(ListadoPedidosViewModel);
  
  async ngOnInit() {
    await this.vm.init();
  }
  
  onProveedorFilterChange(value: string): void {
    if (value) {
      this.vm.filtrarPorProveedor(Number(value));
    } else {
      this.vm.limpiarFiltros();
    }
  }
}