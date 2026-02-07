import { Injectable } from '@angular/core';
import { ProductoDTO } from '../../domain/dtos/producto.dto';
import { PRODUCTOS_MOCK } from '../mocks/productos.mock';

@Injectable({ providedIn: 'root' })
export class ProductoMockRepository {
  private productos: ProductoDTO[] = [...PRODUCTOS_MOCK];

  private delay(ms = 150) { return new Promise(resolve => setTimeout(resolve, ms)); }

  async getListadoProductos(): Promise<ProductoDTO[]> {
    await this.delay();
    return this.productos.filter(p => true);
  }

  async getProductoPorId(id: number): Promise<ProductoDTO> {
    await this.delay();
    const found = this.productos.find(p => p.id === id);
    if (!found) throw new Error('Producto no encontrado');
    return found;
  }

  async insertarProducto(producto: ProductoDTO): Promise<number> {
    await this.delay();
    const newId = Math.max(...this.productos.map(p => p.id), 0) + 1;
    this.productos.push({ ...producto, id: newId });
    return newId;
  }

  async editarProducto(producto: ProductoDTO): Promise<number> {
    await this.delay();
    const idx = this.productos.findIndex(p => p.id === producto.id);
    if (idx === -1) throw new Error('Producto no encontrado');
    this.productos[idx] = producto;
    return producto.id;
  }

  async eliminarProducto(id: number): Promise<number> {
    await this.delay();
    const idx = this.productos.findIndex(p => p.id === id);
    if (idx === -1) return 0;
    this.productos.splice(idx, 1);
    return id;
  }
}
