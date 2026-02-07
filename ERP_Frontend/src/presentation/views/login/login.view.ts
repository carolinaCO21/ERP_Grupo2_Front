import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginViewModel } from '../../viewmodels/login.viewmodel';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.view.html',
  styleUrls: ['./login.view.css'],
  providers: [LoginViewModel]
})
export class LoginView implements OnInit {
  mostrarPassword: boolean = false;

  constructor(public viewModel: LoginViewModel) {}

  ngOnInit(): void {
    // Inicialización si es necesaria
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    await this.viewModel.login();
  }

  togglePasswordVisibility(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  onInputChange(): void {
    this.viewModel.limpiarError();
  }
}