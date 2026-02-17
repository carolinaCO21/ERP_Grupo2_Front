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
import { EstadoPedido } from '../../../domain/enums/estado-pedido.enum';

@Injectable()
export class EditarInsertarPedidoViewModel {
  private createPedidoUseCase = inject(CreatePedidoUseCase);
  private updatePedidoUseCase = inject(UpdatePedidoUseCase);
  private getPedidoByIdUseCase = inject(GetPedidoByIdUseCase);
  private getProveedoresUseCase = inject(GetProveedoresUseCase);
  private getProductosPorProveedorUseCase = inject(GetProductosPorProveedorUseCase);
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
    this.lineasPedido.update(lineas => lineas.filter((_, i) => i !== index));
  }

  actualizarLinea(index: number, campo: keyof LineaPedidoCreateDTO, valor: any): void {
    this.lineasPedido.update(lineas => {
      return lineas.map((linea, i) => {
        if (i !== index) return linea;
        
        const lineaActualizada = { ...linea, [campo]: valor };
        
        if (campo === 'idProducto' && valor) {
          const producto = this.productosDisponibles().find(p => p.idProducto === valor);
          if (producto) {
            lineaActualizada.precioUnitario = producto.precioUnitario;
          }
        }
        
        return lineaActualizada;
      });
    });
  }

  private validarFormulario(): string | null {
    const direccion = this.direccionEntrega();
    
    if (!direccion || direccion.length < 5) {
      return 'La dirección de entrega debe tener al menos 5 caracteres.';
    }
    
    if (direccion.length > 500) {
      return 'La dirección de entrega no puede superar los 500 caracteres.';
    }
    
    if (!this.proveedorSeleccionado()) {
      return 'Debe seleccionar un proveedor.';
    }
    
    if (this.lineasPedido().length === 0) {
      return 'Debe agregar al menos una línea de pedido.';
    }

    const lineasInvalidas = this.lineasPedido().some(linea => 
      !linea.idProducto || linea.cantidad < 1 || linea.precioUnitario <= 0
    );
    
    if (lineasInvalidas) {
      return 'Todas las líneas deben tener producto, cantidad válida y precio.';
    }
    
    return null;
  }
  
  async guardarPedido(): Promise<void> {
    const errorValidacion = this.validarFormulario();
    if (errorValidacion) {
      this.errorMessage.set(errorValidacion);
      return;
    }

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
      this.errorMessage.set(error.message || 'Error al guardar el pedido');
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
    const pedidoCreateDto: PedidoCreateDTO = {
      idProveedor: this.proveedorSeleccionado()!,
      direccionEntrega: this.direccionEntrega(),
      lineasPedido: this.lineasPedido()
    };
    console.log('Enviando pedido:', JSON.stringify(pedidoCreateDto, null, 2));
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
      
      await this.onProveedorChange(pedido.idProveedor);
      
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