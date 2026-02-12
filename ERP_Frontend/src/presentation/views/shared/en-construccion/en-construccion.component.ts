import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EnConstruccionComponent as EnConstruccionSharedComponent } from '../../../components/shared/en-construccion/en-construccion.component';

@Component({
  selector: 'app-en-construccion-view',
  standalone: true,
  imports: [CommonModule, RouterModule, EnConstruccionSharedComponent],
  templateUrl: './en-construccion.component.html',
  styleUrls: ['./en-construccion.component.css']
})
export class EnConstruccionViewComponent {
  modulosPendientes = [
    { nombre: 'Inventario', icono: '📦' },
    { nombre: 'Facturación', icono: '💰' },
    { nombre: 'Clientes', icono: '👥' },
    { nombre: 'Reportes', icono: '📊' }
  ];
}