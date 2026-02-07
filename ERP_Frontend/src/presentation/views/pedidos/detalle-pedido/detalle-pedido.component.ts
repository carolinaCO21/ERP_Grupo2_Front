import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetallePedidoViewModel } from '../../../viewmodels/pedidos/detalle-pedido.viewmodel';
import { HeaderComponent } from '../../../components/shared/header/header.component';
import { SidebarComponent } from '../../../components/shared/sidebar/sidebar.component';

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
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
