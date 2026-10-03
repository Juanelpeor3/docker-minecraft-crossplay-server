import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { WebSocketService } from '../../services/websocket/websocket.service';
import { ServerStatus } from '../../models';
import { PlayerCardComponent } from '../../shared/player-card/player-card';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge';
import { Subject, interval, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [PlayerCardComponent, StatusBadgeComponent],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly api = inject(ApiService);
  private readonly ws = inject(WebSocketService);
  private readonly destroy$ = new Subject<void>();

  status = signal<ServerStatus | null>(null);
  lastUpdate = signal('--');

  ngOnInit() {
    this.loadStatus();

    // Poll every 15s
    interval(15_000)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.api.getStatus()),
      )
      .subscribe((s) => this.applyStatus(s));

    // WebSocket live updates
    this.ws.connect();
    this.ws.status$.pipe(takeUntil(this.destroy$)).subscribe((s) => this.applyStatus(s));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.ws.disconnect();
  }

  private loadStatus() {
    this.api.getStatus().subscribe((s) => this.applyStatus(s));
  }

  private applyStatus(s: ServerStatus) {
    this.status.set(s);
    this.lastUpdate.set(new Date().toLocaleTimeString());
  }
}