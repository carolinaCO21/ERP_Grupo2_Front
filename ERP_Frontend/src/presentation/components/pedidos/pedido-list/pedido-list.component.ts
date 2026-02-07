import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoUIModel } from '../../../models/pedido-ui.model';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.scss']
})
export class PedidoListComponent {
  @Input() pedidos: PedidoUIModel[] = [];
  @Input() isLoading: boolean = false;
  @Input() errorMessage: string = '';
  
  @Output() eliminar = new EventEmitter<number>();
  @Output() verDetalle = new EventEmitter<number>();
  @Output() editar = new EventEmitter<number>();

  onEliminar(id: number): void {
    this.eliminar.emit(id);
  }

  onVerDetalle(id: number): void {
    this.verDetalle.emit(id);
  }

  onEditar(id: number): void {
    this.editar.emit(id);
  }
}