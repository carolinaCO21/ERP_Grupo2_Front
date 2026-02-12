import { Injectable, inject } from '@angular/core';
import { ProductoRepository } from '../../../data/repositories/producto.repository';
import { ProductoDTO } from '../../dtos/producto.dto';

@Injectable({ providedIn: 'root' })
export class GetProductoByIdUseCase {
  private productoRepository = inject(ProductoRepository);

  async execute(id: number): Promise<ProductoDTO> {
    return await this.productoRepository.getProductoPorId(id);
  }
}
