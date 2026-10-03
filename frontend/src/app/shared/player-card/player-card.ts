import { Component, input } from '@angular/core';
import { Player } from '../../core/models';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.html',
})
export class PlayerCardComponent {
  player = input.required<Player>();
}