import { Injectable, inject } from '@angular/core';
import { PedidoMockRepository } from '../../../data/repositories/pedido.repository.mock';

@Injectable({ providedIn: 'root' })
export class DeletePedidoUseCase {
  private pedidoRepository = inject(PedidoMockRepository);

  async execute(id: number): Promise<boolean> {
    return await this.pedidoRepository.eliminarPedido(id);
  }
}
