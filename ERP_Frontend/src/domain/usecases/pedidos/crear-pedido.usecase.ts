import { Injectable, inject } from '@angular/core';
import { PedidoMockRepository } from '../../../data/repositories/pedido.repository.mock';
import { PedidoCreateDTO } from '../../dtos/pedido-create.dto';
import { PedidoDetailDTO } from '../../dtos/pedido-detail.dto';

@Injectable({ providedIn: 'root' })
export class CrearPedidoUseCase {
  private pedidoRepository = inject(PedidoMockRepository);

  async execute(pedidoCreateDto: PedidoCreateDTO): Promise<PedidoDetailDTO> {
    return await this.pedidoRepository.insertarPedido(pedidoCreateDto);
  }
}
