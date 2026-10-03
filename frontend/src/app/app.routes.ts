import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { LoginComponent } from './pages/login/login';
import { LayoutComponent } from './layout/layout';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { PlayerListComponent } from './pages/players/player-list/player-list';
import { PlayerDetailComponent } from './pages/players/player-detail/player-detail';
import { AdminComponent } from './pages/admin/admin';
import { NotFoundComponent } from './pages/404/404';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'players', component: PlayerListComponent, canActivate: [authGuard] },
      { path: 'players/:id', component: PlayerDetailComponent, canActivate: [authGuard] },
      { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
    ],
  },
  { path: '**', component: NotFoundComponent },
];