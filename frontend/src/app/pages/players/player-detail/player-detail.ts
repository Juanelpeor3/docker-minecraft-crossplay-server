import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../../services/api/api.service';
import { Player, Session } from '../../../models';

@Component({
  selector: 'app-player-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './player-detail.html',
})
export class PlayerDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiService);

  player = signal<Player | null>(null);
  sessions = signal<Session[]>([]);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getPlayer(id).subscribe((p) => this.player.set(p));
    this.api.getPlayerSessions(id).subscribe((s) => this.sessions.set(s));
  }

  formatDuration(session: Session): string {
    const start = new Date(session.joinedAt).getTime();
    const end = session.leftAt ? new Date(session.leftAt).getTime() : Date.now();
    const mins = Math.floor((end - start) / 60_000);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }
}