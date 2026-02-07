import { Injectable, inject } from '@angular/core';
import { PedidoMockRepository } from '../../../data/repositories/pedido.repository.mock';
import { PedidoDetailDTO } from '../../dtos/pedido-detail.dto';

@Injectable({ providedIn: 'root' })
export class GetPedidoByIdUseCase {
  private pedidoRepository = inject(PedidoMockRepository);

  async execute(id: number): Promise<PedidoDetailDTO> {
    return await this.pedidoRepository.getPedidoPorId(id);
  }
}
