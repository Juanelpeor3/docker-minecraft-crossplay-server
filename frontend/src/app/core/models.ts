export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface Player {
  id: number;
  name: string;
  platform: string;
  firstSeen: string;
}

export interface Session {
  id: number;
  playerId: number;
  playerName: string;
  platform: string;
  joinedAt: string;
  leftAt: string | null;
}

export interface ServerStatus {
  online: boolean;
  playerCount: number;
  maxPlayers: number;
  players: Player[];
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}