import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUseCase } from '../../../domain/usecases/auth/login.usecase';

@Injectable()
export class LoginViewModel {
  private loginUseCase = inject(LoginUseCase);
  private router = inject(Router);

  // Signals para estado reactivo
  isLoading = signal(false);
  errorMessage = signal('');

  async login(email: string, password: string): Promise<void> {
    if (!email || !password) {
      this.errorMessage.set('Email y contraseña son requeridos');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      await this.loginUseCase.execute(email, password);
      // Navegar a home después del login exitoso
      await this.router.navigate(['/home']);
    } catch (error: any) {
      this.errorMessage.set(error.message || 'Error al iniciar sesión');
    } finally {
      this.isLoading.set(false);
    }
  }
}
