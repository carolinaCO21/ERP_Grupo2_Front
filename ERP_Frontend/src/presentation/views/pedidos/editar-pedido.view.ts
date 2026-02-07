import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { SidebarComponent } from '../../components/shared/sidebar/sidebar.component';
import { EditarPedidoViewModel } from '../../viewmodels/editar-insertar-pedido.viewmodel';

@Component({
  selector: 'app-editar-pedido-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HeaderComponent,
    SidebarComponent
  ],
  templateUrl: './editar-pedido.view.html',
  styleUrls: ['./editar-pedido.view.css'],
  providers: [EditarPedidoViewModel]
})
export class EditarPedidoView implements OnInit {
  constructor(
    public viewModel: EditarPedidoViewModel,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async params => {
      const pedidoId = params['id'] ? +params['id'] : undefined;
      await this.viewModel.inicializar(pedidoId);
    });
  }

  async onProveedorChange(event: Event): Promise<void> {
    const select = event.target as HTMLSelectElement;
    const proveedorId = +select.value;
    await this.viewModel.onProveedorChange(proveedorId);
  }

  onProductoChange(index: number, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const productoId = +select.value;
    this.viewModel.onProductoChange(index, productoId);
  }

  onAgregarLinea(): void {
    this.viewModel.agregarLinea();
  }

  onEliminarLinea(index: number): void {
    this.viewModel.eliminarLinea(index);
  }

  async onGuardar(): Promise<void> {
    await this.viewModel.guardarCambios();
  }

  onCancelar(): void {
    this.viewModel.cancelar();
  }
}