import { Injectable, inject } from '@angular/core';
import { PedidoRepository } from '../../../data/repositories/pedido.repository';
import { PedidoListDTO } from '../../dtos/pedido-list.dto';

@Injectable({ providedIn: 'root' })
export class GetPedidosUseCase {
  private pedidoRepository = inject(PedidoRepository);

  async execute(): Promise<PedidoListDTO[]> {
    return await this.pedidoRepository.getListadoPedidos();
  }
}
