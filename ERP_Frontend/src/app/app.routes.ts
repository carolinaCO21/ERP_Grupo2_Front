import { Routes } from '@angular/router';
import { LoginView } from '../presentation/views/login/login.view';
import { HomeView } from '../presentation/views/home/home.view';
import { ListadoPedidosView } from '../presentation/views/pedidos/listado-pedidos.view';
import { DetallePedidoView } from '../presentation/views/pedidos/detalle-pedido.view';
import { EditarPedidoView } from '../presentation/views/pedidos/editar-pedido.view';
import { EnConstruccionView } from '../presentation/views/en-construccion/en-construccion.view';
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
    component: LoginView,
    title: 'Iniciar Sesión - AndalucíaERP'
  },

  // Home - Protegido
  { 
    path: 'home', 
    component: HomeView,
    canActivate: [authGuard],
    title: 'Inicio - AndalucíaERP'
  },

  // Pedidos - Rutas protegidas
  { 
    path: 'pedidos', 
    component: ListadoPedidosView,
    canActivate: [authGuard],
    title: 'Pedidos a Proveedores - AndalucíaERP'
  },
  { 
    path: 'pedidos/nuevo', 
    component: EditarPedidoView,
    canActivate: [authGuard],
    title: 'Nuevo Pedido - AndalucíaERP'
  },
  { 
    path: 'pedidos/editar/:id', 
    component: EditarPedidoView,
    canActivate: [authGuard],
    title: 'Editar Pedido - AndalucíaERP'
  },
  { 
    path: 'pedidos/:id', 
    component: DetallePedidoView,
    canActivate: [authGuard],
    title: 'Detalle de Pedido - AndalucíaERP'
  },

  // En Construcción - Para módulos no desarrollados
  { 
    path: 'en-construccion', 
    component: EnConstruccionView,
    canActivate: [authGuard],
    title: 'En Construcción - AndalucíaERP'
  },

  // Wildcard - Redirige a login si la ruta no existe
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];