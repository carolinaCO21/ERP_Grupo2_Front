import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LogoutUseCase } from '../../../application/usecases/auth/logout.usecase';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nombreEmpresa: string = 'TechSolutions';
  nombreERP: string = 'AndalucíaERP';
  usuarioActual: string = '';

  constructor(
    private logoutUseCase: LogoutUseCase,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener usuario actual del localStorage o servicio
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      this.usuarioActual = `${userData.nombre} ${userData.apellidos}`;
    }
  }

  async cerrarSesion(): Promise<void> {
    try {
      await this.logoutUseCase.execute();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}