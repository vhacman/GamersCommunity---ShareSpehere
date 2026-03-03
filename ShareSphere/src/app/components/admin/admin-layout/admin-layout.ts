import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

/**
 * Componente layout per la sezione admin.
 * Gestisce la navigazione tra le varie pagine admin e aggiorna il titolo dinamicamente.
 */
@Component({
  selector: 'app-admin-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatIconModule, MatButtonModule, MatBadgeModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout implements OnInit, OnDestroy {
  // Router iniettato tramite inject()
  private router = inject(Router);

  // Titolo della pagina corrente (aggiornato dinamicamente)
  pageTitle = 'Dashboard';

  // Mappatura tra URL e titoli delle pagine
  private titoli: Record<string, string> = {
    dashboard: 'Dashboard',
    articoli: 'Gestione Articoli',
    utenti: 'Gestione Utenti',
    challenge: 'Gestione Challenge',
    impostazioni: 'Impostazioni',
  };

  // Subscription per gli eventi di navigazione
  private sub: Subscription = Subscription.EMPTY;

  ngOnInit() {
    // Aggiorna il titolo iniziale
    this.updateTitle(this.router.url);
    
    // Sottoscrive agli eventi di navigazione per aggiornare il titolo ad ogni cambio di rotta
    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => this.updateTitle((e as NavigationEnd).url));
  }

  // Cleanup: unsubscribe per evitare memory leak
  ngOnDestroy() { this.sub.unsubscribe(); }

  /**
   * Aggiorna il titolo della pagina in base all'URL corrente.
   * Estrae l'ultimo segmento dell'URL e lo usa come chiave nel mapp titoli.
   */
  private updateTitle(url: string) {
    const seg = url.split('/').pop() ?? '';
    this.pageTitle = this.titoli[seg] ?? 'Admin';
  }
}
