import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginViewModel } from '../../../viewmodels/login.viewmodel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginViewModel]
})
export class LoginComponent implements OnInit {
  vm = inject(LoginViewModel);
  
  mostrarPassword = false;

  ngOnInit(): void {
    // Inicialización si es necesaria
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    await this.vm.login();
  }

  togglePasswordVisibility(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  onInputChange(): void {
    this.vm.limpiarError();
  }

  onEmailChange(value: string): void {
    this.vm.email.set(value);
  }

  onPasswordChange(value: string): void {
    this.vm.password.set(value);
  }
}