import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  stats = [
    { label: 'Pedidos Activos', value: '24', change: '+3 esta semana', icon: 'orders', gradient: 'gradient-indigo' },
    { label: 'Completados', value: '156', change: '+12 este mes', icon: 'check', gradient: 'gradient-emerald' },
    { label: 'Pendientes', value: '8', change: '2 urgentes', icon: 'clock', gradient: 'gradient-amber' },
    { label: 'Total Facturado', value: '45.230 \u20ac', change: '+8% vs anterior', icon: 'euro', gradient: 'gradient-violet' },
  ];

  quickActions = [
    { label: 'Nuevo Pedido', route: '/home/pedidos/nuevo', icon: 'plus' },
    { label: 'Ver Pedidos', route: '/home/pedidos/listado', icon: 'list' },
    { label: 'Proveedores', route: '/home/proveedores', icon: 'users' },
    { label: 'Informes', route: '/home/reportes', icon: 'chart' },
  ];
}
