import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  username = '';
  password = '';
  error = signal('');
  loading = signal(false);

  onSubmit() {
    this.loading.set(true);
    this.error.set('');

    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => {
        this.error.set('Credenciales incorrectas');
        this.loading.set(false);
      },
    });
  }
}