import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
})
export class AdminComponent {
  private readonly api = inject(ApiService);

  command = '';
  commandResult = signal('');
  commandLoading = signal(false);

  whitelistPlayer = '';
  whitelistResult = signal('');
  whitelistLoading = signal(false);

  executeCommand() {
    if (!this.command) return;
    this.commandLoading.set(true);
    this.api.executeCommand(this.command).subscribe({
      next: (res) => {
        this.commandResult.set(res.result);
        this.commandLoading.set(false);
      },
      error: () => {
        this.commandResult.set('Error al ejecutar el comando');
        this.commandLoading.set(false);
      },
    });
  }

  executeWhitelist(action: 'add' | 'remove') {
    if (!this.whitelistPlayer) return;
    this.whitelistLoading.set(true);
    this.api.whitelistAction(this.whitelistPlayer, action).subscribe({
      next: (res) => {
        this.whitelistResult.set(res.result);
        this.whitelistLoading.set(false);
      },
      error: () => {
        this.whitelistResult.set('Error al modificar la whitelist');
        this.whitelistLoading.set(false);
      },
    });
  }
}