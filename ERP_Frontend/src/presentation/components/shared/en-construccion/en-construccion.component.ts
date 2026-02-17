import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-en-construccion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './en-construccion.component.html',
  styleUrls: ['./en-construccion.component.css']
})
export class EnConstruccionComponent {
  modulosPendientes = [
    { nombre: 'Gestion de Proveedores', icon: 'suppliers' },
    { nombre: 'Catalogo de Productos', icon: 'products' },
    { nombre: 'Gestion de Personal', icon: 'people' },
    { nombre: 'Sistema de Informes', icon: 'reports' },
    { nombre: 'Configuracion Avanzada', icon: 'settings' },
    { nombre: 'Control de Inventario', icon: 'inventory' },
  ];
}
