import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _token = signal<string | null>(localStorage.getItem('jwt'));

  readonly token = this._token.asReadonly();
  readonly isAuthenticated = computed(() => !!this._token());

  login(credentials: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((res) => {
          localStorage.setItem('jwt', res.token);
          this._token.set(res.token);
        }),
      );
  }

  logout() {
    localStorage.removeItem('jwt');
    this._token.set(null);
    this.router.navigate(['/login']);
  }
}