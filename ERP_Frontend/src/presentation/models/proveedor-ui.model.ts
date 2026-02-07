import { ProveedorDTO } from '../../domain/dtos/proveedor.dto';

export interface ProveedorUIModel extends ProveedorDTO {
  estadoBadgeClass: string;
  estadoTexto: string;
  direccionCompleta?: string;
}