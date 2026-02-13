import { Injectable, inject } from '@angular/core';
import { PedidoRepository } from '../../../data/repositories/pedido.repository';
import { PedidoUpdateDTO } from '../../dtos/pedido-update.dto';
import { PedidoDetailDTO } from '../../dtos/pedido-detail.dto';

@Injectable({ providedIn: 'root' })
export class UpdatePedidoUseCase {
  private pedidoRepository = inject(PedidoRepository);

  async execute(pedidoUpdateDto: PedidoUpdateDTO): Promise<PedidoDetailDTO> {
    return await this.pedidoRepository.editarPedido(pedidoUpdateDto);
  }
}
