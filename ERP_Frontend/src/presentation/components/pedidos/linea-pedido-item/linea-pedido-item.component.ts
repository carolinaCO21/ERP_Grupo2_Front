import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineaPedidoUIModel } from '../../../models/linea-ui.model';

@Component({
  selector: 'app-linea-pedido-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './linea-pedido-item.component.html',
  styleUrls: ['./linea-pedido-item.component.css']
})
export class LineaPedidoItemComponent {
  @Input() linea!: LineaPedidoUIModel;
  @Input() index: number = 0;
  @Input() esEditable: boolean = false;
  
  @Output() eliminar = new EventEmitter<number>();

  onEliminar(): void {
    this.eliminar.emit(this.index);
  }
}