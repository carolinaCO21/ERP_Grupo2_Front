import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUseCase } from '../../application/usecases/auth/login.usecase';

@Injectable({
  providedIn: 'root'
})
export class LoginViewModel {
  email: string = '';
  password: string = '';
  cargando: boolean = false;
  error: string = '';

  constructor(
    private loginUseCase: LoginUseCase,
    private router: Router
  ) {}

  async login(): Promise<void> {
    this.error = '';
    
    if (!this.validarFormulario()) {
      return;
    }

    this.cargando = true;

    try {
      await this.loginUseCase.execute(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.error = this.obtenerMensajeError(error);
      console.error('Error en login:', error);
    } finally {
      this.cargando = false;
    }
  }

  private validarFormulario(): boolean {
    if (!this.email || !this.password) {
      this.error = 'Por favor, complete todos los campos';
      return false;
    }

    if (!this.validarEmail(this.email)) {
      this.error = 'Por favor, ingrese un email válido';
      return false;
    }

    if (this.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres';
      return false;
    }

    return true;
  }

  private validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  private obtenerMensajeError(error: any): string {
    if (error.code === 'auth/user-not-found') {
      return 'Usuario no encontrado';
    }
    if (error.code === 'auth/wrong-password') {
      return 'Contraseña incorrecta';
    }
    if (error.code === 'auth/invalid-email') {
      return 'Email inválido';
    }
    if (error.code === 'auth/user-disabled') {
      return 'Usuario deshabilitado';
    }
    return 'Error al iniciar sesión. Por favor, intente nuevamente.';
  }

  limpiarError(): void {
    this.error = '';
  }
}