import { Injectable, inject } from '@angular/core';
import { ProductoMockRepository } from '../../../data/repositories/producto.repository.mock';
import { ProductoDTO } from '../../dtos/producto.dto';

@Injectable({ providedIn: 'root' })
export class GetProductosUseCase {
  private productoRepository = inject(ProductoMockRepository);

  async execute(): Promise<ProductoDTO[]> {
    return await this.productoRepository.getListadoProductos();
  }
}
