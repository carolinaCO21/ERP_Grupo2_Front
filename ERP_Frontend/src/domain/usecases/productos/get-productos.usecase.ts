import { Injectable, inject } from '@angular/core';
import { ProductoRepository } from '../../../data/repositories/producto.repository';
import { ProductoDTO } from '../../dtos/producto.dto';

@Injectable({ providedIn: 'root' })
export class GetProductosUseCase {
  private productoRepository = inject(ProductoRepository);

  async execute(): Promise<ProductoDTO[]> {
    return await this.productoRepository.getListadoProductos();
  }
}
