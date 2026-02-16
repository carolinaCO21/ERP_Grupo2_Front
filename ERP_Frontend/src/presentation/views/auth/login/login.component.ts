import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginViewModel } from '../../../viewmodels/auth/login.viewmodel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginViewModel]
})
export class LoginComponent {
  vm = inject(LoginViewModel);
  
  email = '';
  password = '';
  showPassword = false;
  
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  
  async onSubmit() {
    await this.vm.login(this.email, this.password);
  }
}