import { Injectable, inject } from '@angular/core';
import { PedidoRepository } from '../../../data/repositories/pedido.repository';
import { PedidoListDTO } from '../../dtos/pedido-list.dto';

@Injectable({ providedIn: 'root' })
export class GetPedidosByProveedorUseCase {
  private pedidoRepository = inject(PedidoRepository);

  async execute(idProveedor: number): Promise<PedidoListDTO[]> {
    return await this.pedidoRepository.getPedidosPorProveedor(idProveedor);
  }
}
