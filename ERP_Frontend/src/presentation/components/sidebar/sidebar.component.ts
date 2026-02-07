import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  ruta: string;
  icono: string;
  texto: string;
  activo: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    {
      ruta: '/home',
      icono: '🏠',
      texto: 'Inicio',
      activo: false
    },
    {
      ruta: '/pedidos',
      icono: '📦',
      texto: 'Pedidos a Proveedores',
      activo: true
    },
    {
      ruta: '/en-construccion',
      icono: '📊',
      texto: 'Productos',
      activo: false
    },
    {
      ruta: '/en-construccion',
      icono: '🏢',
      texto: 'Proveedores',
      activo: false
    },
    {
      ruta: '/en-construccion',
      icono: '👥',
      texto: 'Personal',
      activo: false
    },
    {
      ruta: '/en-construccion',
      icono: '💰',
      texto: 'Finanzas',
      activo: false
    },
    {
      ruta: '/en-construccion',
      icono: '📈',
      texto: 'Informes',
      activo: false
    },
    {
      ruta: '/en-construccion',
      icono: '⚙️',
      texto: 'Configuración',
      activo: false
    }
  ];

  estaColapsado: boolean = false;

  toggleSidebar(): void {
    this.estaColapsado = !this.estaColapsado;
  }
}