import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-en-construccion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './en-construccion.component.html',
  styleUrls: ['./en-construccion.component.scss']
})
export class EnConstruccionComponent {
  modulosPendientes = [
    { nombre: 'Gestión de Proveedores', icon: '🏭' },
    { nombre: 'Catálogo de Productos', icon: '📦' },
    { nombre: 'Gestión de Personal', icon: '👥' },
    { nombre: 'Sistema de Informes', icon: '📊' },
    { nombre: 'Configuración Avanzada', icon: '⚙️' },
    { nombre: 'Control de Inventario', icon: '📋' },
  ];
}