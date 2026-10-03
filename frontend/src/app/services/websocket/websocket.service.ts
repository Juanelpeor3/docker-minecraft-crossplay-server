import { Injectable, inject, OnDestroy } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { ServerStatus } from '../../models';

@Injectable({ providedIn: 'root' })
export class WebSocketService implements OnDestroy {
  private readonly auth = inject(AuthService);
  private client: Client | null = null;
  private readonly statusSubject = new Subject<ServerStatus>();

  readonly status$ = this.statusSubject.asObservable();

  connect() {
    if (this.client?.active) return;

    const base = environment.wsUrl;
    const brokerURL = base.startsWith('/')
      ? `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}${base}`
      : base;

    this.client = new Client({
      brokerURL,
      connectHeaders: {
        Authorization: `Bearer ${this.auth.token()}`,
      },
      reconnectDelay: 5000,
      onConnect: () => {
        this.client?.subscribe('/topic/status', (message: IMessage) => {
          this.statusSubject.next(JSON.parse(message.body));
        });
      },
      onStompError: (frame) => {
        console.error('WebSocket STOMP error:', frame.headers['message']);
      },
    });

    this.client.activate();
  }

  disconnect() {
    this.client?.deactivate();
    this.client = null;
  }

  ngOnDestroy() {
    this.disconnect();
  }
}