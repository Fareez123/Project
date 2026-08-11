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
  private readonly router =
    inject(Router);

  credentials: LoginCredentials = {
    email: '',
    password: '',
    rememberMe: false
  };

  showPassword = false;

  isSubmitting = false;

  formSubmitted = false;

  errorMessage = '';

  constructor() {
    const rememberedEmail =
      localStorage.getItem(
        'careerflowRememberedEmail'
      );

    if (rememberedEmail) {
      this.credentials.email =
        rememberedEmail;

      this.credentials.rememberMe =
        true;
    }
  }

  login(
    form: NgForm
  ): void {
    this.formSubmitted = true;
    this.errorMessage = '';

    /*
     * For development:
     * Any non-empty email/username
     * and password are accepted.
     */

    if (
      !this.credentials.email.trim() ||
      !this.credentials.password.trim()
    ) {
      this.errorMessage =
        'Please enter your email and password.';

      return;
    }

    this.isSubmitting = true;

    window.setTimeout(
      () => {

        if (
          this.credentials.rememberMe
        ) {
          localStorage.setItem(
            'careerflowRememberedEmail',
            this.credentials.email
          );
        } else {
          localStorage.removeItem(
            'careerflowRememberedEmail'
          );
        }

        /*
         * Temporary mock login state.
         */
        localStorage.setItem(
          'careerflowLoggedIn',
          'true'
        );

        this.isSubmitting = false;

        this.router.navigate([
          '/dashboard'
        ]);
      },
      500
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword =
      !this.showPassword;
  }

  clearError(): void {
    this.errorMessage = '';
  }
}