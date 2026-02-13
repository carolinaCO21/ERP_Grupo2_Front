import { Injectable, inject } from '@angular/core';
import { PedidoRepository } from '../../../data/repositories/pedido.repository';
import { PedidoDetailDTO } from '../../dtos/pedido-detail.dto';

@Injectable({ providedIn: 'root' })
export class GetPedidoByIdUseCase {
  private pedidoRepository = inject(PedidoRepository);

  async execute(id: number): Promise<PedidoDetailDTO> {
    return await this.pedidoRepository.getPedidoPorId(id);
  }
}
