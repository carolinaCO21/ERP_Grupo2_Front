import { Injectable, inject } from '@angular/core';
import { ProveedorMockRepository } from '../../../data/repositories/proveedor.repository.mock';
import { ProveedorDTO } from '../../dtos/proveedor.dto';

@Injectable({ providedIn: 'root' })
export class GetProveedoresUseCase {
  private proveedorRepository = inject(ProveedorMockRepository);

  async execute(): Promise<ProveedorDTO[]> {
    return await this.proveedorRepository.getListadoProveedores();
  }
}
