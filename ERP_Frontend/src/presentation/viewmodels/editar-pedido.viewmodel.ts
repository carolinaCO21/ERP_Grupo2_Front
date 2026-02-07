import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoDetailDTO } from '../../domain/dtos/pedido-detail.dto';
import { PedidoUpdateDTO } from '../../domain/dtos/pedido-update.dto';
import { PedidoCreateDTO } from '../../domain/dtos/pedido-create.dto';
import { LineaPedidoCreateDTO } from '../../domain/dtos/linea-pedido-create.dto';
import { ProveedorDTO } from '../../domain/dtos/proveedor.dto';
import { ProductoProveedorDTO } from '../../domain/dtos/producto-proveedor.dto';
import { GetPedidoByIdUseCase } from '../../application/usecases/pedidos/get-pedido-by-id.usecase';
import { CrearPedidoUseCase } from '../../application/usecases/pedidos/crear-pedido.usecase';
import { EditarPedidoUseCase } from '../../application/usecases/pedidos/editar-pedido.usecase';
import { GetProveedoresUseCase } from '../../application/usecases/proveedores/get-proveedores.usecase';
import { GetProductosPorProveedorUseCase } from '../../application/usecases/proveedores/get-productos-por-proveedor.usecase';
import { EstadoPedido } from '../../domain/enums/estado-pedido.enum';

@Injectable({
  providedIn: 'root'
})
export class EditarPedidoViewModel {
  // Datos del pedido
  pedidoId: number | null = null;
  proveedorSeleccionado: number | null = null;
  estadoSeleccionado: string = EstadoPedido.PENDIENTE;
  direccionEntrega: string = '';
  lineasPedido: LineaPedidoCreateDTO[] = [];

  // Catálogos
  proveedores: ProveedorDTO[] = [];
  productosDisponibles: ProductoProveedorDTO[] = [];

  // Estado de UI
  cargando: boolean = false;
  error: string = '';
  modoEdicion: boolean = false;

  constructor(
    private getPedidoByIdUseCase: GetPedidoByIdUseCase,
    private crearPedidoUseCase: CrearPedidoUseCase,
    private editarPedidoUseCase: EditarPedidoUseCase,
    private getProveedoresUseCase: GetProveedoresUseCase,
    private getProductosPorProveedorUseCase: GetProductosPorProveedorUseCase,
    private router: Router
  ) {}

  async inicializar(pedidoId?: number): Promise<void> {
    this.cargando = true;
    this.error = '';

    try {
      await this.cargarProveedores();

      if (pedidoId) {
        this.modoEdicion = true;
        this.pedidoId = pedidoId;
        await this.cargarPedido(pedidoId);
      }
    } catch (error) {
      this.error = 'Error al inicializar el formulario';
      console.error('Error:', error);
    } finally {
      this.cargando = false;
    }
  }

  private async cargarProveedores(): Promise<void> {
    this.proveedores = await this.getProveedoresUseCase.execute();
  }

  private async cargarPedido(id: number): Promise<void> {
    const pedido = await this.getPedidoByIdUseCase.execute(id);
    
    this.proveedorSeleccionado = pedido.idProveedor;
    this.estadoSeleccionado = pedido.estado;
    this.direccionEntrega = pedido.direccionEntrega;
    
    this.lineasPedido = pedido.lineasPedido.map(linea => ({
      idProducto: linea.idProducto,
      cantidad: linea.cantidad,
      precioUnitario: linea.precioUnitario,
      ivaPorcentaje: linea.ivaPorcentaje
    }));

    await this.cargarProductosProveedor(pedido.idProveedor);
  }

  async onProveedorChange(proveedorId: number): Promise<void> {
    this.proveedorSeleccionado = proveedorId;
    this.lineasPedido = [];
    await this.cargarProductosProveedor(proveedorId);
  }

  private async cargarProductosProveedor(proveedorId: number): Promise<void> {
    this.cargando = true;
    try {
      this.productosDisponibles = await this.getProductosPorProveedorUseCase.execute(proveedorId);
    } catch (error) {
      this.error = 'Error al cargar productos del proveedor';
      console.error('Error:', error);
    } finally {
      this.cargando = false;
    }
  }

  agregarLinea(): void {
    if (!this.productosDisponibles || this.productosDisponibles.length === 0) {
      this.error = 'Debe seleccionar un proveedor primero';
      return;
    }

    const nuevaLinea: LineaPedidoCreateDTO = {
      idProducto: this.productosDisponibles[0].idProducto,
      cantidad: 1,
      precioUnitario: this.productosDisponibles[0].precioUnitario,
      ivaPorcentaje: 21
    };

    this.lineasPedido.push(nuevaLinea);
  }

  eliminarLinea(index: number): void {
    this.lineasPedido.splice(index, 1);
  }

  onProductoChange(index: number, productoId: number): void {
    const producto = this.productosDisponibles.find(p => p.idProducto === productoId);
    if (producto) {
      this.lineasPedido[index].precioUnitario = producto.precioUnitario;
      this.lineasPedido[index].idProducto = productoId;
    }
  }

  calcularSubtotalLinea(linea: LineaPedidoCreateDTO): number {
    return linea.cantidad * linea.precioUnitario;
  }

  calcularIvaLinea(linea: LineaPedidoCreateDTO): number {
    const subtotal = this.calcularSubtotalLinea(linea);
    return subtotal * (linea.ivaPorcentaje / 100);
  }

  calcularTotalLinea(linea: LineaPedidoCreateDTO): number {
    const subtotal = this.calcularSubtotalLinea(linea);
    const iva = this.calcularIvaLinea(linea);
    return subtotal + iva;
  }

  calcularSubtotalGeneral(): number {
    return this.lineasPedido.reduce((sum, linea) => sum + this.calcularSubtotalLinea(linea), 0);
  }

  calcularImpuestosGeneral(): number {
    return this.lineasPedido.reduce((sum, linea) => sum + this.calcularIvaLinea(linea), 0);
  }

  calcularTotalGeneral(): number {
    return this.calcularSubtotalGeneral() + this.calcularImpuestosGeneral();
  }

  async guardarCambios(): Promise<void> {
    if (!this.validarFormulario()) {
      return;
    }

    this.cargando = true;
    this.error = '';

    try {
      if (this.modoEdicion && this.pedidoId) {
        await this.actualizarPedido();
      } else {
        await this.crearNuevoPedido();
      }

      this.router.navigate(['/pedidos']);
    } catch (error) {
      this.error = 'Error al guardar el pedido';
      console.error('Error:', error);
    } finally {
      this.cargando = false;
    }
  }

  private async crearNuevoPedido(): Promise<void> {
    const usuarioId = this.obtenerUsuarioActualId();

    const pedidoDto: PedidoCreateDTO = {
      idProveedor: this.proveedorSeleccionado!,
      idUsuario: usuarioId,
      direccionEntrega: this.direccionEntrega,
      lineasPedido: this.lineasPedido
    };

    await this.crearPedidoUseCase.execute(pedidoDto);
  }

  private async actualizarPedido(): Promise<void> {
    const pedidoDto: PedidoUpdateDTO = {
      id: this.pedidoId!,
      estado: this.estadoSeleccionado,
      direccionEntrega: this.direccionEntrega,
      lineasPedido: this.lineasPedido
    };

    await this.editarPedidoUseCase.execute(pedidoDto);
  }

  private validarFormulario(): boolean {
    if (!this.proveedorSeleccionado) {
      this.error = 'Debe seleccionar un proveedor';
      return false;
    }

    if (!this.direccionEntrega || this.direccionEntrega.trim() === '') {
      this.error = 'Debe ingresar una dirección de entrega';
      return false;
    }

    if (this.lineasPedido.length === 0) {
      this.error = 'Debe agregar al menos una línea de pedido';
      return false;
    }

    for (const linea of this.lineasPedido) {
      if (linea.cantidad <= 0) {
        this.error = 'Las cantidades deben ser mayores a 0';
        return false;
      }
    }

    return true;
  }

  private obtenerUsuarioActualId(): number {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      return userData.id;
    }
    return 1; // Valor por defecto (esto debería venir del servicio de autenticación)
  }

  obtenerEstadosDisponibles(): string[] {
    return Object.values(EstadoPedido);
  }

  obtenerNombreProducto(idProducto: number): string {
    const producto = this.productosDisponibles.find(p => p.idProducto === idProducto);
    return producto ? producto.nombreProducto : '';
  }

  cancelar(): void {
    this.router.navigate(['/pedidos']);
  }
}