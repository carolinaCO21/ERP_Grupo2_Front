import { Injectable, inject, signal, computed } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CreatePedidoUseCase } from '../../../domain/usecases/pedidos/create-pedido.usecase';
import { UpdatePedidoUseCase } from '../../../domain/usecases/pedidos/update-pedido.usecase';
import { GetPedidoByIdUseCase } from '../../../domain/usecases/pedidos/get-pedido-by-id.usecase';
import { GetProveedoresUseCase } from '../../../domain/usecases/proveedores/get-proveedores.usecase';
import { GetProductosPorProveedorUseCase } from '../../../domain/usecases/proveedores/get-productos-por-proveedor.usecase';
import { ProveedorDTO } from '../../../domain/dtos/proveedor.dto';
import { ProductoProveedorDTO } from '../../../domain/dtos/producto-proveedor.dto';
import { LineaPedidoCreateDTO } from '../../../domain/dtos/linea-pedido-create.dto';
import { PedidoCreateDTO } from '../../../domain/dtos/pedido-create.dto';
import { PedidoUpdateDTO } from '../../../domain/dtos/pedido-update.dto';
// TODO: Cambiar a abstracción cuando exista UsuarioRepository en domain
import { UsuarioMockRepository } from '../../../data/repositories/usuario.repository.mock';
import { EstadoPedido } from '../../../domain/enums/estado-pedido.enum';

@Injectable()
export class EditarInsertarPedidoViewModel {
  private createPedidoUseCase = inject(CreatePedidoUseCase);
  private updatePedidoUseCase = inject(UpdatePedidoUseCase);
  private getPedidoByIdUseCase = inject(GetPedidoByIdUseCase);
  private getProveedoresUseCase = inject(GetProveedoresUseCase);
  private getProductosPorProveedorUseCase = inject(GetProductosPorProveedorUseCase);
  private usuarioRepository = inject(UsuarioMockRepository);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  // Signals - Estado
  modoEdicion = signal(false);
  pedidoId = signal<number | null>(null);
  isLoading = signal(false);
  errorMessage = signal('');
  
  // Signals - Datos
  proveedores = signal<ProveedorDTO[]>([]);
  productosDisponibles = signal<ProductoProveedorDTO[]>([]);
  
  // Signals - Formulario
  proveedorSeleccionado = signal<number | null>(null);
  direccionEntrega = signal('');
  estadoSeleccionado = signal(EstadoPedido.PENDIENTE);
  lineasPedido = signal<LineaPedidoCreateDTO[]>([]);
  
  // Computed signals - Totales calculados
  subtotalPedido = computed(() => {
    return this.lineasPedido().reduce((sum, linea) => {
      const subtotal = linea.cantidad * linea.precioUnitario;
      return sum + subtotal;
    }, 0);
  });
  
  impuestosPedido = computed(() => {
    return this.lineasPedido().reduce((sum, linea) => {
      const subtotal = linea.cantidad * linea.precioUnitario;
      const iva = subtotal * (linea.ivaPorcentaje / 100);
      return sum + iva;
    }, 0);
  });
  
  totalPedido = computed(() => {
    return this.subtotalPedido() + this.impuestosPedido();
  });
  
  async init(): Promise<void> {
    await this.cargarProveedores();
    
    const pedidoId = this.route.snapshot.paramMap.get('id');
    if (pedidoId) {
      this.modoEdicion.set(true);
      this.pedidoId.set(Number(pedidoId));
      await this.cargarPedido(Number(pedidoId));
    }
  }
  
  async cargarProveedores(): Promise<void> {
    try {
      const proveedores = await this.getProveedoresUseCase.execute();
      this.proveedores.set(proveedores);
    } catch (error) {
      console.error('Error al cargar proveedores', error);
    }
  }
  
  async onProveedorChange(idProveedor: number): Promise<void> {
    this.proveedorSeleccionado.set(idProveedor);
    this.lineasPedido.set([]);
    
    try {
      const productos = await this.getProductosPorProveedorUseCase.execute(idProveedor);
      this.productosDisponibles.set(productos);
    } catch (error) {
      console.error('Error al cargar productos del proveedor', error);
    }
  }
  
  agregarLinea(): void {
    const nuevaLinea: LineaPedidoCreateDTO = {
      idProducto: 0,
      cantidad: 1,
      precioUnitario: 0,
      ivaPorcentaje: 21
    };
    
    this.lineasPedido.update(lineas => [...lineas, nuevaLinea]);
  }
  
  eliminarLinea(index: number): void {
    this.lineasPedido.update(lineas => 
      lineas.filter((_, i) => i !== index)
    );
  }
  
  onLineaChange(index: number, linea: LineaPedidoCreateDTO): void {
    this.lineasPedido.update(lineas => {
      const nuevasLineas = [...lineas];
      nuevasLineas[index] = linea;
      
      // Autocompletar precio si se seleccionó un producto
      if (linea.idProducto && linea.precioUnitario === 0) {
        const producto = this.productosDisponibles().find(
          p => p.idProducto === linea.idProducto
        );
        if (producto) {
          nuevasLineas[index].precioUnitario = producto.precioUnitario;
        }
      }
      
      return nuevasLineas;
    });
  }
  
  async guardarPedido(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    try {
      if (this.modoEdicion()) {
        await this.actualizarPedido();
      } else {
        await this.crearPedido();
      }
      
      await this.router.navigate(['/home/pedidos/listado']);
    } catch (error: any) {
      this.errorMessage.set(error.message);
    } finally {
      this.isLoading.set(false);
    }
  }
  
  async cancelar(): Promise<void> {
    await this.router.navigate(['/home/pedidos/listado']);
  }
  
  obtenerEstadosDisponibles(): EstadoPedido[] {
    return Object.values(EstadoPedido);
  }
  
  private async crearPedido(): Promise<void> {
    const usuario = this.usuarioRepository.getCurrentUser();
    if (!usuario) {
      throw new Error('No hay usuario autenticado');
    }
    
    const pedidoCreateDto: PedidoCreateDTO = {
      idProveedor: this.proveedorSeleccionado()!,
      idUsuario: usuario.id,
      direccionEntrega: this.direccionEntrega(),
      lineasPedido: this.lineasPedido()
    };
    
    await this.createPedidoUseCase.execute(pedidoCreateDto);
  }
  
  private async actualizarPedido(): Promise<void> {
    const pedidoUpdateDto: PedidoUpdateDTO = {
      id: this.pedidoId()!,
      estado: this.estadoSeleccionado(),
      direccionEntrega: this.direccionEntrega(),
      lineasPedido: this.lineasPedido()
    };
    
    await this.updatePedidoUseCase.execute(pedidoUpdateDto);
  }
  
  private async cargarPedido(id: number): Promise<void> {
    this.isLoading.set(true);
    
    try {
      const pedido = await this.getPedidoByIdUseCase.execute(id);
      
      this.proveedorSeleccionado.set(pedido.idProveedor);
      this.direccionEntrega.set(pedido.direccionEntrega);
      this.estadoSeleccionado.set(pedido.estado as EstadoPedido);
      
      // Cargar productos del proveedor
      await this.onProveedorChange(pedido.idProveedor);
      
      // Mapear líneas del pedido
      const lineas: LineaPedidoCreateDTO[] = pedido.lineasPedido.map(l => ({
        idProducto: l.idProducto,
        cantidad: l.cantidad,
        precioUnitario: l.precioUnitario,
        ivaPorcentaje: l.ivaPorcentaje
      }));
      
      this.lineasPedido.set(lineas);
    } catch (error: any) {
      this.errorMessage.set(error.message);
    } finally {
      this.isLoading.set(false);
    }
  }
}