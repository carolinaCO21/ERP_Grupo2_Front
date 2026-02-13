import { Injectable, inject } from '@angular/core';
import { ProveedorRepository } from '../../../data/repositories/proveedor.repository';
import { ProductoProveedorDTO } from '../../dtos/producto-proveedor.dto';

@Injectable({ providedIn: 'root' })
export class GetProductosPorProveedorUseCase {
  private proveedorRepository = inject(ProveedorRepository);

  async execute(id: number): Promise<ProductoProveedorDTO[]> {
    return await this.proveedorRepository.getProductosPorProveedor(id);
  }
}
