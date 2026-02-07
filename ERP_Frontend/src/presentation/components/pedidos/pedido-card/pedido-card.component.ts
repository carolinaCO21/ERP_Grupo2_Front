import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PedidoListDTO } from '../../../../domain/dtos/pedido-list.dto';

@Component({
  selector: 'app-pedido-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pedido-card.component.html',
  styleUrls: ['./pedido-card.component.css']
})
export class PedidoCardComponent {
  @Input() pedido!: PedidoListDTO;
  @Output() eliminar = new EventEmitter<number>();

  onEliminar(): void {
    this.eliminar.emit(this.pedido.id);
  }
}
