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
    { icon: '📦', label: 'Pedidos Activos', value: '24', color: '#667eea' },
    { icon: '✅', label: 'Pedidos Completados', value: '156', color: '#48bb78' },
    { icon: '⏳', label: 'Pedidos Pendientes', value: '8', color: '#f59e0b' },
    { icon: '💰', label: 'Total Facturado', value: '45.230 €', color: '#8b5cf6' },
  ];

  quickActions = [
    { icon: '➕', label: 'Nuevo Pedido', route: '/home/pedidos/nuevo', color: '#667eea' },
    { icon: '📋', label: 'Ver Pedidos', route: '/home/pedidos/listado', color: '#48bb78' },
    { icon: '🏭', label: 'Proveedores', route: '/en-construccion', color: '#f59e0b' },
    { icon: '📊', label: 'Informes', route: '/en-construccion', color: '#8b5cf6' },
  ];
}