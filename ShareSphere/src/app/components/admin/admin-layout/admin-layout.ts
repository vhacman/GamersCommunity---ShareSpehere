import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatIconModule, MatButtonModule, MatBadgeModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout implements OnInit, OnDestroy {
  pageTitle = 'Dashboard';

  private titoli: Record<string, string> = {
    dashboard: 'Dashboard',
    articoli: 'Gestione Articoli',
    utenti: 'Gestione Utenti',
    challenge: 'Gestione Challenge',
    impostazioni: 'Impostazioni',
  };

  private sub: Subscription = Subscription.EMPTY;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateTitle(this.router.url);
    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => this.updateTitle((e as NavigationEnd).url));
  }

  ngOnDestroy() { this.sub.unsubscribe(); }

  private updateTitle(url: string) {
    const seg = url.split('/').pop() ?? '';
    this.pageTitle = this.titoli[seg] ?? 'Admin';
  }
}
