import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth/auth.interceptor';
import { environment } from '../environments/environment';
import { ApiService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';
import { WebSocketService } from './services/websocket/websocket.service';
import { MockApiService } from './services/mock/mock-api.service';
import { MockAuthService } from './services/mock/mock-auth.service';
import { MockWebSocketService } from './services/mock/mock-websocket.service';

const demoProviders = environment.demo
  ? [
      { provide: ApiService, useClass: MockApiService },
      { provide: AuthService, useClass: MockAuthService },
      { provide: WebSocketService, useClass: MockWebSocketService },
    ]
  : [];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    ...demoProviders,
  ],
};