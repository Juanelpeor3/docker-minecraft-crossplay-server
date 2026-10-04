import { Injectable, OnDestroy } from '@angular/core';
import { Subject, interval, Subscription } from 'rxjs';
import { ServerStatus } from '../../models';
import { MOCK_STATUS, MOCK_ONLINE_PLAYERS } from './mock-data';

@Injectable()
export class MockWebSocketService implements OnDestroy {
  private readonly statusSubject = new Subject<ServerStatus>();
  private intervalSub: Subscription | null = null;

  readonly status$ = this.statusSubject.asObservable();

  connect() {
    if (this.intervalSub) return;

    // Emit initial status immediately
    this.statusSubject.next({ ...MOCK_STATUS });

    // Simulate real-time updates every 10 seconds with slight variation
    this.intervalSub = interval(10_000).subscribe(() => {
      const variation = Math.random() > 0.5 ? 1 : 0;
      const count = MOCK_ONLINE_PLAYERS.length + variation;
      const players = variation
        ? [...MOCK_ONLINE_PLAYERS, { id: 99, name: 'RandomVisitor', platform: 'JAVA', firstSeen: new Date().toISOString() }]
        : [...MOCK_ONLINE_PLAYERS];

      this.statusSubject.next({
        online: true,
        playerCount: count,
        maxPlayers: 20,
        players,
      });
    });
  }

  disconnect() {
    this.intervalSub?.unsubscribe();
    this.intervalSub = null;
  }

  ngOnDestroy() {
    this.disconnect();
  }
}
