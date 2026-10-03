import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../../services/api/api.service';
import { Player } from '../../../models';

@Component({
  selector: 'app-player-list',
  imports: [RouterLink, FormsModule, DatePipe],
  templateUrl: './player-list.html',
})
export class PlayerListComponent implements OnInit {
  private readonly api = inject(ApiService);

  players = signal<Player[]>([]);
  searchTerm = signal('');

  filteredPlayers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const all = this.players();
    if (!term) return all;
    return all.filter((p) => p.name.toLowerCase().includes(term));
  });

  ngOnInit() {
    this.api.getPlayers().subscribe((p) => this.players.set(p));
  }
}