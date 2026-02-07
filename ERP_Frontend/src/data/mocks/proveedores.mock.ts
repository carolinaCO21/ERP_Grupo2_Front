import { ProveedorDTO } from '../../domain/dtos/proveedor.dto';

export const PROVEEDORES_MOCK: ProveedorDTO[] = [
  {
    id: 1,
    nombreEmpresa: 'Proveedora S.A.',
    cif: 'A12345678',
    telefono: '912345678',
    email: 'contacto@proveedora.es',
    activo: true
  },
  {
    id: 2,
    nombreEmpresa: 'Distribuciones X',
    cif: 'B87654321',
    telefono: '913333444',
    email: 'ventas@distribucionesx.com',
    activo: true
  },
  {
    id: 3,
    nombreEmpresa: 'Suministros Norte',
    cif: 'C11223344',
    telefono: '914444555',
    email: 'info@suministrosnorte.com',
    activo: false
  }
];
