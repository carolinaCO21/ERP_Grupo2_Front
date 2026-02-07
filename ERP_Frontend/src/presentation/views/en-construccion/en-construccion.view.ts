import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-en-construccion-view',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  templateUrl: './en-construccion.view.html',
  styleUrls: ['./en-construccion.view.css']
})
export class EnConstruccionView {
  modulos = [
    { nombre: 'Productos', icono: '📊', descripcion: 'Gestión del catálogo de productos' },
    { nombre: 'Proveedores', icono: '🏢', descripcion: 'Administración de proveedores' },
    { nombre: 'Personal', icono: '👥', descripcion: 'Recursos humanos y nóminas' },
    { nombre: 'Finanzas', icono: '💰', descripcion: 'Contabilidad y finanzas' },
    { nombre: 'Informes', icono: '📈', descripcion: 'Reportes y análisis de datos' },
    { nombre: 'Configuración', icono: '⚙️', descripcion: 'Configuración del sistema' }
  ];
}