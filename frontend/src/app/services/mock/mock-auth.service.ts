import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../../models';

const DEMO_TOKEN = 'demo-jwt-token';

@Injectable()
export class MockAuthService {
  private readonly router = inject(Router);

  private readonly _token = signal<string | null>(
    localStorage.getItem('jwt'),
  );

  readonly token = this._token.asReadonly();
  readonly isAuthenticated = computed(() => !!this._token());

  login(credentials: LoginRequest): Observable<LoginResponse> {
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      return of({ token: DEMO_TOKEN }).pipe(
        delay(400),
        tap((res) => {
          localStorage.setItem('jwt', res.token);
          this._token.set(res.token);
        }),
      );
    }

    return throwError(() => ({ status: 401, message: 'Invalid credentials' })).pipe(
      delay(400),
    );
  }

  logout() {
    localStorage.removeItem('jwt');
    this._token.set(null);
    this.router.navigate(['/login']);
  }
}
