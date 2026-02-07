import { Injectable, inject } from '@angular/core';
import { ProductoMockRepository } from '../../../data/repositories/producto.repository.mock';
import { ProductoDTO } from '../../dtos/producto.dto';

@Injectable({ providedIn: 'root' })
export class GetProductoByIdUseCase {
  private productoRepository = inject(ProductoMockRepository);

  async execute(id: number): Promise<ProductoDTO> {
    return await this.productoRepository.getProductoPorId(id);
  }
}
