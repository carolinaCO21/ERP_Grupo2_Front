import { Injectable, inject } from '@angular/core';
import { PedidoMockRepository } from '../../../data/repositories/pedido.repository.mock';
import { PedidoListDTO } from '../../dtos/pedido-list.dto';

@Injectable({ providedIn: 'root' })
export class GetPedidosByEstadoUseCase {
  private pedidoRepository = inject(PedidoMockRepository);

  async execute(estado: string): Promise<PedidoListDTO[]> {
    return await this.pedidoRepository.getPedidosPorEstado(estado);
  }
}
