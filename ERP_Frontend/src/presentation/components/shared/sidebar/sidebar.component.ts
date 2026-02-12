import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = signal(false);

  menuItems = [
    { icon: '🏠', label: 'Dashboard', route: '/home/dashboard' },
    { icon: '📦', label: 'Pedidos', route: '/home/pedidos/listado' },
    { icon: '🏭', label: 'Proveedores', route: '/home/proveedores' },
    { icon: '📦', label: 'Productos', route: '/home/productos' },
    { icon: '📊', label: 'Inventario', route: '/home/inventario' },
    { icon: '📈', label: 'Reportes', route: '/home/reportes' },
    { icon: '⚙️', label: 'Configuración', route: '/home/configuracion' },
  ];

  toggleSidebar(): void {
    this.isCollapsed.update(value => !value);
  }
}