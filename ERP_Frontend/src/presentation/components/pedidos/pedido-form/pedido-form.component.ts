import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditarInsertarPedidoViewModel } from '../../../viewmodels/pedidos/editar-insertar-pedido.viewmodel';
import { LineaPedidoItemComponent } from '../linea-pedido-item/linea-pedido-item.component';
import { EstadoPedido } from '../../../../domain/enums/estado-pedido.enum';

@Component({
  selector: 'app-pedido-form',
  standalone: true,
  imports: [CommonModule, FormsModule, LineaPedidoItemComponent],
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent {
  @Input() vm!: EditarInsertarPedidoViewModel;
  @Output() guardar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  onProveedorChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const idProveedor = Number(select.value);
    if (idProveedor) {
      this.vm.onProveedorChange(idProveedor);
    }
  }

  onEstadoChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.vm.estadoSeleccionado.set(select.value as EstadoPedido);
  }

  onDireccionChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.vm.direccionEntrega.set(input.value);
  }

  onGuardar(): void {
    this.guardar.emit();
  }

  onCancelar(): void {
    this.cancelar.emit();
  }

  puedeGuardar(): boolean {
    return !this.vm.isLoading() &&
           this.vm.proveedorSeleccionado() !== null &&
           this.vm.direccionEntrega().trim().length > 0 &&
           this.vm.lineasPedido().length > 0;
  }

  getEstadosDisponibles(): string[] {
    return Object.values(EstadoPedido);
  }
}
