import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Player, Session, ServerStatus, Page } from '../../models';
import {
  MOCK_PLAYERS,
  MOCK_STATUS,
  MOCK_SESSIONS,
  MOCK_COMMAND_RESPONSES,
} from './mock-data';

const FAKE_DELAY = 300;

@Injectable()
export class MockApiService {
  getStatus(): Observable<ServerStatus> {
    return of(MOCK_STATUS).pipe(delay(FAKE_DELAY));
  }

  getPlayers(): Observable<Player[]> {
    return of(MOCK_PLAYERS).pipe(delay(FAKE_DELAY));
  }

  getPlayer(id: number): Observable<Player> {
    const player = MOCK_PLAYERS.find((p) => p.id === id) ?? MOCK_PLAYERS[0];
    return of(player).pipe(delay(FAKE_DELAY));
  }

  getPlayerSessions(id: number): Observable<Session[]> {
    const sessions = MOCK_SESSIONS.filter((s) => s.playerId === id);
    return of(sessions).pipe(delay(FAKE_DELAY));
  }

  getSessions(page = 0, size = 20): Observable<Page<Session>> {
    const sorted = [...MOCK_SESSIONS].sort(
      (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime(),
    );
    const start = page * size;
    const content = sorted.slice(start, start + size);

    return of({
      content,
      totalElements: MOCK_SESSIONS.length,
      totalPages: Math.ceil(MOCK_SESSIONS.length / size),
      number: page,
      size,
    }).pipe(delay(FAKE_DELAY));
  }

  executeCommand(command: string): Observable<{ result: string }> {
    const key = command.trim().toLowerCase().split(' ')[0];
    const result = MOCK_COMMAND_RESPONSES[key] ?? MOCK_COMMAND_RESPONSES['default'];
    return of({ result }).pipe(delay(500));
  }

  whitelistAction(
    player: string,
    action: 'add' | 'remove',
  ): Observable<{ result: string }> {
    const msg =
      action === 'add'
        ? `Added ${player} to the whitelist`
        : `Removed ${player} from the whitelist`;
    return of({ result: msg }).pipe(delay(500));
  }
}
