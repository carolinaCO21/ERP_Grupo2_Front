import { Injectable } from '@angular/core';
import { PedidoDetailDTO } from '../../domain/dtos/pedido-detail.dto';
import { GetPedidoByIdUseCase } from '../../application/usecases/pedidos/get-pedido-by-id.usecase';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoViewModel {
  pedido: PedidoDetailDTO | null = null;
  cargando: boolean = false;
  error: string = '';

  constructor(
    private getPedidoByIdUseCase: GetPedidoByIdUseCase
  ) {}

  async cargarPedido(id: number): Promise<void> {
    this.cargando = true;
    this.error = '';

    try {
      this.pedido = await this.getPedidoByIdUseCase.execute(id);
    } catch (error) {
      this.error = 'Error al cargar el detalle del pedido';
      console.error('Error al cargar pedido:', error);
    } finally {
      this.cargando = false;
    }
  }

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

  calcularSubtotalLineas(): number {
    if (!this.pedido || !this.pedido.lineasPedido) {
      return 0;
    }
    return this.pedido.lineasPedido.reduce((sum, linea) => sum + linea.subtotal, 0);
  }

  calcularTotalImpuestos(): number {
    if (!this.pedido || !this.pedido.lineasPedido) {
      return 0;
    }
    return this.pedido.lineasPedido.reduce((sum, linea) => {
      const impuesto = linea.subtotal * (linea.ivaPorcentaje / 100);
      return sum + impuesto;
    }, 0);
  }

  calcularTotalLineas(): number {
    if (!this.pedido || !this.pedido.lineasPedido) {
      return 0;
    }
    return this.pedido.lineasPedido.reduce((sum, linea) => sum + linea.totalLinea, 0);
  }

  imprimirPedido(): void {
    window.print();
  }

  exportarPDF(): void {
    // Aquí se implementaría la lógica para exportar a PDF
    console.log('Exportando pedido a PDF...');
  }

  enviarPorEmail(): void {
    // Aquí se implementaría la lógica para enviar por email
    console.log('Enviando pedido por email...');
  }
}