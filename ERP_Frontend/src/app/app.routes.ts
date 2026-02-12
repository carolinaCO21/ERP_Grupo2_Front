import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
  // Redirección inicial
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },

  // Login - Sin protección
  { 
    path: 'login',
    loadComponent: () => import('../presentation/views/auth/login/login.component')
      .then(m => m.LoginComponent),
    title: 'Iniciar Sesión - AndalucíaERP'
  },

  // Home - Layout principal con rutas hijas protegidas
  { 
    path: 'home',
    loadComponent: () => import('../presentation/views/main/home/home.component')
      .then(m => m.HomeComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('../presentation/views/main/dashboard/dashboard.component')
          .then(m => m.DashboardComponent),
        title: 'Dashboard - AndalucíaERP'
      },
      {
        path: 'pedidos/listado',
        loadComponent: () => import('../presentation/views/pedidos/listado-pedidos/listado-pedidos.component')
          .then(m => m.ListadoPedidosComponent),
        title: 'Listado de Pedidos - AndalucíaERP'
      },
      {
        path: 'pedidos/nuevo',
        loadComponent: () => import('../presentation/views/pedidos/editar-insertar-pedido/editar-insertar-pedido.component')
          .then(m => m.EditarInsertarPedidoComponent),
        title: 'Nuevo Pedido - AndalucíaERP'
      },
      {
        path: 'pedidos/editar/:id',
        loadComponent: () => import('../presentation/views/pedidos/editar-insertar-pedido/editar-insertar-pedido.component')
          .then(m => m.EditarInsertarPedidoComponent),
        title: 'Editar Pedido - AndalucíaERP'
      },
      {
        path: 'pedidos/detalle/:id',
        loadComponent: () => import('../presentation/views/pedidos/detalle-pedido/detalle-pedido.component')
          .then(m => m.DetallePedidoComponent),
        title: 'Detalle de Pedido - AndalucíaERP'
      },
      // Módulos en construcción
      {
        path: 'proveedores',
        loadComponent: () => import('../presentation/views/shared/en-construccion/en-construccion.component')
          .then(m => m.EnConstruccionViewComponent),
        title: 'Proveedores - AndalucíaERP'
      },
      {
        path: 'productos',
        loadComponent: () => import('../presentation/views/shared/en-construccion/en-construccion.component')
          .then(m => m.EnConstruccionViewComponent),
        title: 'Productos - AndalucíaERP'
      },
      {
        path: 'inventario',
        loadComponent: () => import('../presentation/views/shared/en-construccion/en-construccion.component')
          .then(m => m.EnConstruccionViewComponent),
        title: 'Inventario - AndalucíaERP'
      },
      {
        path: 'reportes',
        loadComponent: () => import('../presentation/views/shared/en-construccion/en-construccion.component')
          .then(m => m.EnConstruccionViewComponent),
        title: 'Reportes - AndalucíaERP'
      },
      {
        path: 'configuracion',
        loadComponent: () => import('../presentation/views/shared/en-construccion/en-construccion.component')
          .then(m => m.EnConstruccionViewComponent),
        title: 'Configuración - AndalucíaERP'
      }
    ]
  },

  // Wildcard - Redirige a login si la ruta no existe
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];