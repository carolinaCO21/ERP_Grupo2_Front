import { Injectable, inject } from '@angular/core';
import { PedidoMockRepository } from '../../../data/repositories/pedido.repository.mock';
import { PedidoListDTO } from '../../dtos/pedido-list.dto';

@Injectable({ providedIn: 'root' })
export class GetPedidosByProveedorUseCase {
  private pedidoRepository = inject(PedidoMockRepository);

  async execute(idProveedor: number): Promise<PedidoListDTO[]> {
    return await this.pedidoRepository.getPedidosPorProveedor(idProveedor);
  }
}
