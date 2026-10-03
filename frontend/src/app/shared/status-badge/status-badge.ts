import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.html',
})
export class StatusBadgeComponent {
  online = input.required<boolean>();
}