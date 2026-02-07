import { ProductoDTO } from '../../domain/dtos/producto.dto';

export interface ProductoUIModel extends ProductoDTO {
  stockBadgeClass: string;
  stockTexto: string;
  precioFormateado: string;
}