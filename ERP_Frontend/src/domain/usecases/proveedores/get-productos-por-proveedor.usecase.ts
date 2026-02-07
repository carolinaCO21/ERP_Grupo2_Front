import { Injectable, inject } from '@angular/core';
import { ProveedorMockRepository } from '../../../data/repositories/proveedor.repository.mock';
import { ProductoProveedorDTO } from '../../dtos/producto-proveedor.dto';

@Injectable({ providedIn: 'root' })
export class GetProductosPorProveedorUseCase {
  private proveedorRepository = inject(ProveedorMockRepository);

  async execute(id: number): Promise<ProductoProveedorDTO[]> {
    return await this.proveedorRepository.getProductosPorProveedor(id);
  }
}
