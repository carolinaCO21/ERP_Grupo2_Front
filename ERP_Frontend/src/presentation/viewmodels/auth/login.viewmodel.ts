import { Injectable, inject, signal } from '@angular/core';
import { LoginUseCase } from '../../../domain/usecases/auth/login.usecase';

@Injectable()
export class LoginViewModel {
  private loginUseCase = inject(LoginUseCase);
  
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
    } catch (error: any) {
      this.errorMessage.set(error.message || 'Error al iniciar sesión');
    } finally {
      this.isLoading.set(false);
    }
  }
}