import { Injectable } from '@angular/core';
import { ProveedorDTO } from '../../domain/dtos/proveedor.dto';
import { ProductoProveedorDTO } from '../../domain/dtos/producto-proveedor.dto';
import { PROVEEDORES_MOCK } from '../mocks/proveedores.mock';
import { PRODUCTOS_PROVEEDOR_MOCK } from '../mocks/productos.mock';
import { PRODUCTOS_POR_PROVEEDOR_MOCK } from '../mocks/producto-proveedor.mock';

@Injectable({ providedIn: 'root' })
export class ProveedorMockRepository {
  private proveedores: ProveedorDTO[] = [...PROVEEDORES_MOCK];

  private delay(ms = 200) { return new Promise(resolve => setTimeout(resolve, ms)); }

  async getListadoProveedores(): Promise<ProveedorDTO[]> {
    await this.delay();
    return this.proveedores.filter(p => p.activo);
  }

  async getProveedorPorId(id: number): Promise<ProveedorDTO> {
    await this.delay();
    const found = this.proveedores.find(p => p.id === id);
    if (!found) throw new Error('Proveedor no encontrado');
    return found;
  }

  async getProductosPorProveedor(id: number): Promise<ProductoProveedorDTO[]> {
    await this.delay();
    // Return provider-specific list if available, otherwise fallback to general list
    return PRODUCTOS_POR_PROVEEDOR_MOCK[id] ?? PRODUCTOS_PROVEEDOR_MOCK;
  }

  async insertarProveedor(proveedor: ProveedorDTO): Promise<number> {
    await this.delay();
    const newId = Math.max(...this.proveedores.map(p => p.id), 0) + 1;
    const newProv = { ...proveedor, id: newId } as ProveedorDTO;
    this.proveedores.push(newProv);
    return newId;
  }

  async editarProveedor(proveedor: ProveedorDTO): Promise<number> {
    await this.delay();
    const idx = this.proveedores.findIndex(p => p.id === proveedor.id);
    if (idx === -1) throw new Error('Proveedor no encontrado');
    this.proveedores[idx] = proveedor;
    return proveedor.id;
  }

  async eliminarProveedor(id: number): Promise<number> {
    await this.delay();
    const idx = this.proveedores.findIndex(p => p.id === id);
    if (idx === -1) return 0;
    this.proveedores.splice(idx, 1);
    return id;
  }
}
