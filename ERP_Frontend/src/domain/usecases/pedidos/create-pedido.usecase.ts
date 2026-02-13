import { Injectable, inject } from '@angular/core';
import { PedidoRepository } from '../../../data/repositories/pedido.repository';
import { PedidoCreateDTO } from '../../dtos/pedido-create.dto';
import { PedidoDetailDTO } from '../../dtos/pedido-detail.dto';

@Injectable({ providedIn: 'root' })
export class CreatePedidoUseCase {
  private pedidoRepository = inject(PedidoRepository);

  async execute(pedidoCreateDto: PedidoCreateDTO): Promise<PedidoDetailDTO> {
    return await this.pedidoRepository.insertarPedido(pedidoCreateDto);
  }
}
