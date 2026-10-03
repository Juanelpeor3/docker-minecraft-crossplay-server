import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Player, Session, ServerStatus, Page } from '../../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  getStatus() {
    return this.http.get<ServerStatus>(`${this.base}/status`);
  }

  getPlayers() {
    return this.http.get<Player[]>(`${this.base}/players`);
  }

  getPlayer(id: number) {
    return this.http.get<Player>(`${this.base}/players/${id}`);
  }

  getPlayerSessions(id: number) {
    return this.http.get<Session[]>(`${this.base}/players/${id}/sessions`);
  }

  getSessions(page = 0, size = 20) {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<Session>>(`${this.base}/sessions`, { params });
  }

  executeCommand(command: string) {
    return this.http.post<{ result: string }>(`${this.base}/admin/command`, { command });
  }

  whitelistAction(player: string, action: 'add' | 'remove') {
    return this.http.post<{ result: string }>(`${this.base}/admin/whitelist`, { player, action });
  }
}