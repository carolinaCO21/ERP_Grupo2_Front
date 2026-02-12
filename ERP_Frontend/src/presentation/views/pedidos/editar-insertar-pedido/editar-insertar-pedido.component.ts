import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarInsertarPedidoViewModel } from '../../../viewmodels/pedidos/editar-insertar-pedido.viewmodel';
import { PedidoFormComponent } from '../../../components/pedidos/pedido-form/pedido-form.component';

@Component({
  selector: 'app-editar-insertar-pedido',
  standalone: true,
  imports: [CommonModule, PedidoFormComponent],
  templateUrl: './editar-insertar-pedido.component.html',
  styleUrls: ['./editar-insertar-pedido.component.css'],
  providers: [EditarInsertarPedidoViewModel]
})
export class EditarInsertarPedidoComponent implements OnInit {
  vm = inject(EditarInsertarPedidoViewModel);
  
  async ngOnInit() {
    await this.vm.init();
  }
}