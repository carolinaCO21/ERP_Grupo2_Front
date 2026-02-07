import { Injectable, inject } from '@angular/core';
import { ProveedorMockRepository } from '../../../data/repositories/proveedor.repository.mock';
import { ProveedorDTO } from '../../dtos/proveedor.dto';

@Injectable({ providedIn: 'root' })
export class GetProveedorByIdUseCase {
  private proveedorRepository = inject(ProveedorMockRepository);

  async execute(id: number): Promise<ProveedorDTO> {
    return await this.proveedorRepository.getProveedorPorId(id);
  }
}
