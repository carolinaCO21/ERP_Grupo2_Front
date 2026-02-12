import { Injectable, inject } from '@angular/core';
import { PedidoMockRepository } from '../../../data/repositories/pedido.repository.mock';
import { EstadoPedido } from '../../enums/estado-pedido.enum';

@Injectable({ providedIn: 'root' })
export class DeletePedidoUseCase {
  private pedidoRepository = inject(PedidoMockRepository);

  async execute(id: number): Promise<boolean> {
    // 🛡️ LÓGICA DE NEGOCIO: Obtener el pedido antes de eliminar
    const pedido = await this.pedidoRepository.getPedidoPorId(id);
    
    // 🛡️ REGLA DE NEGOCIO: No se pueden eliminar pedidos RECIBIDOS
    if (pedido.estado === EstadoPedido.RECIBIDO) {
      throw new Error('No se puede eliminar un pedido que ya ha sido RECIBIDO');
    }
    
    // Si pasa la validación, proceder a eliminar
    return await this.pedidoRepository.eliminarPedido(id);
  }
}