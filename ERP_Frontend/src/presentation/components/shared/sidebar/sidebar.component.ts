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
    { icon: '🏭', label: 'Proveedores', route: '/en-construccion' },
    { icon: '📦', label: 'Productos', route: '/en-construccion' },
    { icon: '👥', label: 'Personal', route: '/en-construccion' },
    { icon: '📊', label: 'Informes', route: '/en-construccion' },
    { icon: '⚙️', label: 'Configuración', route: '/en-construccion' },
  ];

  toggleSidebar(): void {
    this.isCollapsed.update(value => !value);
  }
}