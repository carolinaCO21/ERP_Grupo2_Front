import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineaPedidoCreateDTO } from '../../../../domain/dtos/linea-pedido-create.dto';
import { ProductoProveedorDTO } from '../../../../domain/dtos/producto-proveedor.dto';

@Component({
  selector: 'app-linea-pedido-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './linea-pedido-item.component.html',
  styleUrls: ['./linea-pedido-item.component.css']
})
export class LineaPedidoItemComponent {
  @Input() linea!: LineaPedidoCreateDTO;
  @Input() index!: number;
  @Input() productos: ProductoProveedorDTO[] = [];
  @Output() lineaChange = new EventEmitter<LineaPedidoCreateDTO>();
  @Output() eliminar = new EventEmitter<void>();

  onProductoChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const idProducto = Number(select.value);
    
    const producto = this.productos.find(p => p.idProducto === idProducto);
    const precioUnitario = producto ? producto.precioUnitario : 0;
    
    this.lineaChange.emit({
      ...this.linea,
      idProducto,
      precioUnitario
    });
  }

  onCantidadChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cantidad = Number(input.value);
    
    this.lineaChange.emit({
      ...this.linea,
      cantidad
    });
  }

  onPrecioChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const precioUnitario = Number(input.value);
    
    this.lineaChange.emit({
      ...this.linea,
      precioUnitario
    });
  }

  onIvaChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const ivaPorcentaje = Number(select.value);
    
    this.lineaChange.emit({
      ...this.linea,
      ivaPorcentaje
    });
  }

  onEliminar(): void {
    this.eliminar.emit();
  }

  calcularTotal(): number {
    const subtotal = this.linea.cantidad * this.linea.precioUnitario;
    const iva = subtotal * (this.linea.ivaPorcentaje / 100);
    return subtotal + iva;
  }
}
