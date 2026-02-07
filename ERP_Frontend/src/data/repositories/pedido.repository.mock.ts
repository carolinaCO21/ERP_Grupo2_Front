import { Injectable } from '@angular/core';
import { PedidoListDTO } from '../../domain/dtos/pedido-list.dto';
import { PedidoDetailDTO } from '../../domain/dtos/pedido-detail.dto';
import { PedidoCreateDTO } from '../../domain/dtos/pedido-create.dto';
import { PedidoUpdateDTO } from '../../domain/dtos/pedido-update.dto';
import { PEDIDOS_LIST_MOCK, PEDIDOS_DETAIL_MOCK } from '../mocks/pedidos.mock';

@Injectable({ providedIn: 'root' })
export class PedidoMockRepository {
  private list: PedidoListDTO[] = [...PEDIDOS_LIST_MOCK];
  private details: PedidoDetailDTO[] = [...PEDIDOS_DETAIL_MOCK];
  private nextId = Math.max(...this.details.map(d => d.id), 0) + 1;

  private delay(ms = 250) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getListadoPedidos(): Promise<PedidoListDTO[]> {
    await this.delay();
    return this.list;
  }

  async getPedidoPorId(id: number): Promise<PedidoDetailDTO> {
    await this.delay();
    const found = this.details.find(d => d.id === id);
    if (!found) throw new Error('Pedido no encontrado');
    return found;
  }

  async getPedidosPorProveedor(idProveedor: number): Promise<PedidoListDTO[]> {
    await this.delay();
    const filtered = this.details.filter(d => d.idProveedor === idProveedor)
      .map(d => ({ id: d.id, numeroPedido: d.numeroPedido, nombreProveedor: d.nombreProveedor, fechaPedido: d.fechaPedido, estado: d.estado, total: d.total } as PedidoListDTO));
    return filtered;
  }

  async getPedidosPorEstado(estado: string): Promise<PedidoListDTO[]> {
    await this.delay();
    const filtered = this.details.filter(d => d.estado === estado)
      .map(d => ({ id: d.id, numeroPedido: d.numeroPedido, nombreProveedor: d.nombreProveedor, fechaPedido: d.fechaPedido, estado: d.estado, total: d.total } as PedidoListDTO));
    return filtered;
  }

  async insertarPedido(pedidoCreateDto: PedidoCreateDTO): Promise<PedidoDetailDTO> {
    await this.delay();
    const newId = this.nextId++;
    const numero = `PED-${new Date().getFullYear()}-${String(newId).padStart(5, '0')}`;
    const subtotal = pedidoCreateDto.lineasPedido.reduce((s, l) => s + (l.cantidad * l.precioUnitario), 0);
    const impuestos = pedidoCreateDto.lineasPedido.reduce((s, l) => s + (l.cantidad * l.precioUnitario) * (l.ivaPorcentaje / 100), 0);
    const total = subtotal + impuestos;

    const detail: PedidoDetailDTO = {
      id: newId,
      numeroPedido: numero,
      idProveedor: pedidoCreateDto.idProveedor,
      nombreProveedor: 'Proveedor (mock)',
      idUsuario: pedidoCreateDto.idUsuario,
      nombreUsuario: 'Usuario (mock)',
      fechaPedido: new Date(),
      estado: 'Pendiente',
      subtotal,
      impuestos,
      total,
      direccionEntrega: pedidoCreateDto.direccionEntrega,
      lineasPedido: pedidoCreateDto.lineasPedido.map((l, idx) => ({
        id: idx + 1,
        idProducto: l.idProducto,
        nombreProducto: 'Producto (mock)',
        codigoProducto: 'C-MOCK',
        cantidad: l.cantidad,
        precioUnitario: l.precioUnitario,
        subtotal: l.cantidad * l.precioUnitario,
        ivaPorcentaje: l.ivaPorcentaje,
        totalLinea: l.cantidad * l.precioUnitario * (1 + l.ivaPorcentaje / 100)
      }))
    } as PedidoDetailDTO;

    this.details.push(detail);
    this.list.push({ id: detail.id, numeroPedido: detail.numeroPedido, nombreProveedor: detail.nombreProveedor, fechaPedido: detail.fechaPedido, estado: detail.estado, total: detail.total } as PedidoListDTO);

    return detail;
  }

  async editarPedido(pedidoUpdateDto: PedidoUpdateDTO): Promise<PedidoDetailDTO> {
    await this.delay();
    const idx = this.details.findIndex(d => d.id === pedidoUpdateDto.id);
    if (idx === -1) throw new Error('Pedido no encontrado');

    // Recalculate totals from lineas
    const subtotal = pedidoUpdateDto.lineasPedido.reduce((s, l) => s + (l.cantidad * l.precioUnitario), 0);
    const impuestos = pedidoUpdateDto.lineasPedido.reduce((s, l) => s + (l.cantidad * l.precioUnitario) * (l.ivaPorcentaje / 100), 0);
    const total = subtotal + impuestos;

    const existing = this.details[idx];
    const updated: PedidoDetailDTO = {
      ...existing,
      estado: pedidoUpdateDto.estado,
      direccionEntrega: pedidoUpdateDto.direccionEntrega,
      subtotal,
      impuestos,
      total,
      lineasPedido: pedidoUpdateDto.lineasPedido.map((l, i) => ({
        id: i + 1,
        idProducto: l.idProducto,
        nombreProducto: 'Producto (mock)',
        codigoProducto: 'C-MOCK',
        cantidad: l.cantidad,
        precioUnitario: l.precioUnitario,
        subtotal: l.cantidad * l.precioUnitario,
        ivaPorcentaje: l.ivaPorcentaje,
        totalLinea: l.cantidad * l.precioUnitario * (1 + l.ivaPorcentaje / 100)
      }))
    } as PedidoDetailDTO;

    this.details[idx] = updated;
    const listIdx = this.list.findIndex(l => l.id === updated.id);
    if (listIdx !== -1) {
      this.list[listIdx] = { id: updated.id, numeroPedido: updated.numeroPedido, nombreProveedor: updated.nombreProveedor, fechaPedido: updated.fechaPedido, estado: updated.estado, total: updated.total } as PedidoListDTO;
    }

    return updated;
  }

  async eliminarPedido(id: number): Promise<boolean> {
    await this.delay();
    const dIdx = this.details.findIndex(d => d.id === id);
    if (dIdx === -1) return false;
    this.details.splice(dIdx, 1);
    const lIdx = this.list.findIndex(l => l.id === id);
    if (lIdx !== -1) this.list.splice(lIdx, 1);
    return true;
  }
}
