import { Component, inject } from '@angular/core';
import {
  FormsModule,
  NgForm
} from '@angular/forms';
import {
  Router,
  RouterLink
} from '@angular/router';

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly router = inject(Router);

  credentials: LoginCredentials = {
    email: '',
    password: '',
    rememberMe: false
  };

  showPassword = false;
  isSubmitting = false;
  formSubmitted = false;
  errorMessage = '';

  login(form: NgForm): void {
    this.formSubmitted = true;
    this.errorMessage = '';

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    window.setTimeout(() => {
      const loginSuccessful = true;

      if (!loginSuccessful) {
        this.isSubmitting = false;
        this.errorMessage =
          'The email address or password you entered is incorrect.';
        return;
      }

      if (this.credentials.rememberMe) {
        localStorage.setItem(
          'flowdeskRememberedEmail',
          this.credentials.email
        );
      } else {
        localStorage.removeItem('flowdeskRememberedEmail');
      }

      this.isSubmitting = false;
      this.router.navigate(['/dashboard']);
    }, 800);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  clearError(): void {
    this.errorMessage = '';
  }
}