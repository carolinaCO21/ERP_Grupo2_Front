import { Routes } from '@angular/router';
import { LoginComponent } from '../presentation/views/auth/login/login.component';
import { HomeComponent } from '../presentation/views/main/home/home.component';
import { ListadoPedidosComponent } from '../presentation/views/pedidos/listado-pedidos/listado-pedidos.component';
import { DetallePedidoComponent } from '../presentation/views/pedidos/detalle-pedido/detalle-pedido.component';
import { EditarInsertarPedidoComponent } from '../presentation/views/pedidos/editar-insertar-pedido/editar-insertar-pedido.component';
import { EnConstruccionComponent } from '../presentation/views/shared/en-construccion/en-construccion.component';
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
    component: LoginComponent,
    title: 'Iniciar Sesión - AndalucíaERP'
  },

  // Home - Protegido
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [authGuard],
    title: 'Inicio - AndalucíaERP'
  },

  // Pedidos - Rutas protegidas
  { 
    path: 'pedidos', 
    component: ListadoPedidosComponent,
    canActivate: [authGuard],
    title: 'Pedidos a Proveedores - AndalucíaERP'
  },
  { 
    path: 'pedidos/nuevo', 
    component: EditarInsertarPedidoComponent,
    canActivate: [authGuard],
    title: 'Nuevo Pedido - AndalucíaERP'
  },
  {
    path: 'pedidos/editar/:id',
    component: EditarInsertarPedidoComponent,
    canActivate: [authGuard],
    title: 'Editar Pedido - AndalucíaERP'
  },
  {
    path: 'pedidos/detalle/:id',
    component: DetallePedidoComponent,
    canActivate: [authGuard],
    title: 'Detalle de Pedido - AndalucíaERP'
  },

  // En Construcción - Para módulos no desarrollados
  { 
    path: 'en-construccion', 
    component: EnConstruccionComponent,
    canActivate: [authGuard],
    title: 'En Construcción - AndalucíaERP'
  },

  // Wildcard - Redirige a login si la ruta no existe
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];