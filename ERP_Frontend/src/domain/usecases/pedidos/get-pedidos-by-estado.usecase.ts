import { Injectable, inject } from '@angular/core';
import { PedidoRepository } from '../../../data/repositories/pedido.repository';
import { PedidoListDTO } from '../../dtos/pedido-list.dto';

@Injectable({ providedIn: 'root' })
export class GetPedidosByEstadoUseCase {
  private pedidoRepository = inject(PedidoRepository);

  async execute(estado: string): Promise<PedidoListDTO[]> {
    return await this.pedidoRepository.getPedidosPorEstado(estado);
  }
}
