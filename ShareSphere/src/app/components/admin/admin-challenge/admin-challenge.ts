// ═══════════════════════════════════════════════════════════════════════
// SEZIONE DI: Adriano Mastrobuoni
// PRESENTAZIONE: Punto 1.7 - Admin Challenge
//   Gestione admin delle challenge: lista con stato attiva/conclusa,
//   statistiche aggregate (totale attive, totale partecipanti).
//   Copia dell'array per evitare modifiche dirette ai dati mock.
// ═══════════════════════════════════════════════════════════════════════
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MockDataService } from '../../../services/mock-data-service';
import { Challenge } from '../../../model';

/**
 * Componente per la gestione admin delle challenge.
 * Visualizza l'elenco delle challenge e le relative statistiche.
 */
@Component({
  selector: 'app-admin-challenge',
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './admin-challenge.html',
  styleUrl: './admin-challenge.css',
})
export class AdminChallenge {
  // Lista delle challenge caricate dal servizio mock
  challenge: Challenge[];

  // Servizio dati iniettato tramite inject()
  private data = inject(MockDataService);

  constructor() {
    // Crea una copia dell'array per evitare modifiche dirette ai dati originali
    this.challenge = [...this.data.challenge];
  }

  /** Restituisce il numero di challenge attive */
  get attive(): number { return this.challenge.filter(c => c.attiva).length; }

  /** Restituisce il totale dei partecipanti a tutte le challenge */
  get totPartecipanti(): number { return this.challenge.reduce((s, c) => s + c.partecipanti, 0); }
}
