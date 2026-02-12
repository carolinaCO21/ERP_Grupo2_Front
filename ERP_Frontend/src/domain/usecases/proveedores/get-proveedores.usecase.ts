import { Injectable, inject } from '@angular/core';
import { ProveedorRepository } from '../../../data/repositories/proveedor.repository';
import { ProveedorDTO } from '../../dtos/proveedor.dto';

@Injectable({ providedIn: 'root' })
export class GetProveedoresUseCase {
  private proveedorRepository = inject(ProveedorRepository);

  async execute(): Promise<ProveedorDTO[]> {
    return await this.proveedorRepository.getListadoProveedores();
  }
}
