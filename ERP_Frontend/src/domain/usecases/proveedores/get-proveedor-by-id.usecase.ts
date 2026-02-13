import { Injectable, inject } from '@angular/core';
import { ProveedorRepository } from '../../../data/repositories/proveedor.repository';
import { ProveedorDTO } from '../../dtos/proveedor.dto';

@Injectable({ providedIn: 'root' })
export class GetProveedorByIdUseCase {
  private proveedorRepository = inject(ProveedorRepository);

  async execute(id: number): Promise<ProveedorDTO> {
    return await this.proveedorRepository.getProveedorPorId(id);
  }
}
