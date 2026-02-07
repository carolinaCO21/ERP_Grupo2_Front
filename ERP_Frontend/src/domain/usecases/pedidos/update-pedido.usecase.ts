import { Injectable, inject } from '@angular/core';
import { PedidoMockRepository } from '../../../data/repositories/pedido.repository.mock';
import { PedidoUpdateDTO } from '../../dtos/pedido-update.dto';
import { PedidoDetailDTO } from '../../dtos/pedido-detail.dto';

@Injectable({ providedIn: 'root' })
export class UpdatePedidoUseCase {
  private pedidoRepository = inject(PedidoMockRepository);

  async execute(pedidoUpdateDto: PedidoUpdateDTO): Promise<PedidoDetailDTO> {
    return await this.pedidoRepository.editarPedido(pedidoUpdateDto);
  }
}
