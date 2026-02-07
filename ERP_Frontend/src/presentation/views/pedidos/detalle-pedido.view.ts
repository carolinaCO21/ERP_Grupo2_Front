import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { DetallePedidoViewModel } from '../../viewmodels/detalle-pedido.videmodel';

@Component({
  selector: 'app-detalle-pedido-view',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  templateUrl: './detalle-pedido.view.html',
  styleUrls: ['./detalle-pedido.view.css'],
  providers: [DetallePedidoViewModel]
})
export class DetallePedidoView implements OnInit {
  pedidoId!: number;

  constructor(
    public viewModel: DetallePedidoViewModel,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async params => {
      this.pedidoId = +params['id'];
      await this.viewModel.cargarPedido(this.pedidoId);
    });
  }

  onImprimir(): void {
    this.viewModel.imprimirPedido();
  }

  onExportarPDF(): void {
    this.viewModel.exportarPDF();
  }

  onEnviarEmail(): void {
    this.viewModel.enviarPorEmail();
  }
}