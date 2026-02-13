import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioRepository } from '../../../../data/repositories/usuario.repository';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private usuarioRepository = inject(UsuarioRepository);
  private router = inject(Router);

  get nombreUsuario(): string {
    const user = this.usuarioRepository.getCurrentUser();
    return user ? user.nombre : 'Usuario';
  }

  async logout(): Promise<void> {
    await this.usuarioRepository.logout();
    await this.router.navigate(['/login']);
  }
}