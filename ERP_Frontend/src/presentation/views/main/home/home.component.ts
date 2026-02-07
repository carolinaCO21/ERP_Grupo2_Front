import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../components/shared/header/header.component';
import { SidebarComponent } from '../../../components/shared/sidebar/sidebar.component';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  nombreUsuario: string = '';

  constructor() {
    this.cargarDatosUsuario();
  }

  private cargarDatosUsuario(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      this.nombreUsuario = userData.nombre;
    }
  }
}