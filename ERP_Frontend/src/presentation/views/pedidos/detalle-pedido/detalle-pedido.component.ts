import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetallePedidoViewModel } from '../../../viewmodels/pedidos/detalle-pedido.viewmodel';
import { LoadingSpinnerComponent } from '../../../components/shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css'],
  providers: [DetallePedidoViewModel]
})
export class DetallePedidoComponent implements OnInit {
  vm = inject(DetallePedidoViewModel);
  
  async ngOnInit() {
    await this.vm.init();
  }
}