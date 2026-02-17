import { Component, signal, output } from '@angular/core';
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
  collapsedChange = output<boolean>();

  menuItems = [
    { label: 'Dashboard', route: '/home/dashboard', icon: 'dashboard' },
    { label: 'Pedidos', route: '/home/pedidos/listado', icon: 'orders' },
    { label: 'Proveedores', route: '/home/proveedores', icon: 'suppliers' },
    { label: 'Productos', route: '/home/productos', icon: 'products' },
    { label: 'Inventario', route: '/home/inventario', icon: 'inventory' },
    { label: 'Reportes', route: '/home/reportes', icon: 'reports' },
    { label: 'Configuracion', route: '/home/configuracion', icon: 'settings' },
  ];

  toggleSidebar(): void {
    this.isCollapsed.update(value => !value);
    this.collapsedChange.emit(this.isCollapsed());
  }
}
