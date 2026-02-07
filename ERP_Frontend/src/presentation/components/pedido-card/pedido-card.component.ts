import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PedidoListDTO } from '../../../domain/dtos/pedido-list.dto';

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

  obtenerClaseEstado(estado: string): string {
    const estados: { [key: string]: string } = {
      'PENDIENTE': 'estado-pendiente',
      'APROBADO': 'estado-aprobado',
      'EN_PROCESO': 'estado-proceso',
      'ENVIADO': 'estado-enviado',
      'RECIBIDO': 'estado-recibido',
      'CANCELADO': 'estado-cancelado'
    };
    return estados[estado] || 'estado-default';
  }

  obtenerTextoEstado(estado: string): string {
    const estados: { [key: string]: string } = {
      'PENDIENTE': 'Pendiente',
      'APROBADO': 'Aprobado',
      'EN_PROCESO': 'En Proceso',
      'ENVIADO': 'Enviado',
      'RECIBIDO': 'Recibido',
      'CANCELADO': 'Cancelado'
    };
    return estados[estado] || estado;
  }

  onEliminar(event: Event): void {
    event.stopPropagation();
    if (confirm(`¿Está seguro de eliminar el pedido ${this.pedido.numeroPedido}?`)) {
      this.eliminar.emit(this.pedido.id);
    }
  }
}