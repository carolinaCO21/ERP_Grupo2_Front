import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditarInsertarPedidoViewModel } from '../../../viewmodels/pedidos/editar-insertar-pedido.viewmodel';

@Component({
  selector: 'app-pedido-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent {
  @Input() vm!: EditarInsertarPedidoViewModel;
  @Output() guardar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  onGuardar(): void {
    this.guardar.emit();
  }

  onCancelar(): void {
    this.cancelar.emit();
  }

  trackByIndex(index: number): number {
    return index;
  }
}