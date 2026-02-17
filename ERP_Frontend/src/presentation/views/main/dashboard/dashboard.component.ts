import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardViewModel } from '../../../viewmodels/dashboard/dashboard.viewmodel';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardViewModel]
})
export class DashboardComponent implements OnInit {
  vm = inject(DashboardViewModel);

  quickActions = [
    { label: 'Nuevo Pedido', route: '/home/pedidos/nuevo', icon: 'plus' },
    { label: 'Ver Pedidos', route: '/home/pedidos/listado', icon: 'list' },
    { label: 'Proveedores', route: '/home/proveedores', icon: 'users' },
    { label: 'Informes', route: '/home/reportes', icon: 'chart' },
  ];

  async ngOnInit(): Promise<void> {
    await this.vm.init();
  }
}
