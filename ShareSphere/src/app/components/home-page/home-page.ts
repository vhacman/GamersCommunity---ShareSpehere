import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MockDataService, Articolo, Challenge } from '../../services/mock-data-service';
import { SpazioPubblicitario } from '../shared/spazio-pubblicitario/spazio-pubblicitario';

/**
 * Componente della Home Page.
 * Mostra un riepilogo delle sezioni principali dell'applicazione:
 * aree tematiche, challenge attive e articoli in evidenza.
 * Ogni sezione è paginata con un sistema di "dots" (pallini di navigazione).
 */
@Component({
  selector: 'app-home-page',
  imports: [RouterLink, LowerCasePipe, MatButtonModule, MatIconModule, MatCardModule, SpazioPubblicitario],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

  /** Riferimento all'array delle aree tematiche dal servizio.
   *  Il tipo viene inferito direttamente da MockDataService con typeof. */
  areeTematiche: typeof this.data.areeTematiche;

  /** Numero totale di membri della community. */
  membriTotali: number;

  /** Numero di membri attualmente online. */
  membriOnline: number;

  /** Lista delle sole challenge con flag attiva === true. */
  challengeAttive: Challenge[];

  /** Lista degli articoli con stato 'Pubblicato'. */
  articoliInEvidenza: Articolo[];

  // ===================== PAGINAZIONE =====================
  // signal() è la nuova API reattiva di Angular 16+.
  // A differenza di una semplice variabile, quando cambia
  // Angular aggiorna automaticamente il DOM senza bisogno di
  // EventEmitter o Subject RxJS.

  /** Indice (0-based) della pagina corrente delle challenge. */
  paginaChallenge = signal(0);

  /** Indice (0-based) della pagina corrente degli articoli in evidenza. */
  paginaEvidenza = signal(0);

  /** Indice (0-based) della pagina corrente delle aree tematiche. */
  paginaAree = signal(0);

  /** Numero di elementi mostrati per pagina nelle sezioni challenge ed evidenza. */
  readonly PER_PAGINA = 2;

  /** Numero di aree tematiche mostrate per pagina. */
  readonly AREE_PER_PAGINA = 6;

  // ===================== GETTER PAGINAZIONE CHALLENGE =====================

  /** Numero totale di pagine per le challenge.
   *  Math.ceil arrotonda per eccesso: es. 5 challenge / 2 per pagina = 3 pagine. */
  get totalePagineChallenge(): number {
    return Math.ceil(this.challengeAttive.length / this.PER_PAGINA);
  }

  /** Array di indici usato nel template per generare i pallini di navigazione.
   *  Array.from({ length: N }, (_, i) => i) crea [0, 1, 2, ...N-1]. */
  get dotsChallenge(): number[] {
    return Array.from({ length: this.totalePagineChallenge }, (_, i) => i);
  }

  /** Restituisce solo le challenge della pagina corrente.
   *  paginaChallenge() si legge come funzione perché è un signal. */
  get challengeVisibili(): Challenge[] {
    const start = this.paginaChallenge() * this.PER_PAGINA;
    return this.challengeAttive.slice(start, start + this.PER_PAGINA);
  }

  // ===================== GETTER PAGINAZIONE EVIDENZA =====================

  /** Numero totale di pagine per gli articoli in evidenza. */
  get totalePagineEvidenza(): number {
    return Math.ceil(this.articoliInEvidenza.length / this.PER_PAGINA);
  }

  /** Array di indici per i pallini degli articoli in evidenza. */
  get dotsEvidenza(): number[] {
    return Array.from({ length: this.totalePagineEvidenza }, (_, i) => i);
  }

  /** Restituisce solo gli articoli della pagina corrente. */
  get evidenzaVisibili(): Articolo[] {
    const start = this.paginaEvidenza() * this.PER_PAGINA;
    return this.articoliInEvidenza.slice(start, start + this.PER_PAGINA);
  }

  // ===================== GETTER PAGINAZIONE AREE =====================

  /** Numero totale di pagine per le aree tematiche. */
  get totalePagineAree(): number {
    return Math.ceil(this.areeTematiche.length / this.AREE_PER_PAGINA);
  }

  /** Array di indici per i pallini delle aree tematiche. */
  get dotsAree(): number[] {
    return Array.from({ length: this.totalePagineAree }, (_, i) => i);
  }

  /** Restituisce solo le aree tematiche della pagina corrente. */
  get areeVisibili() {
    const start = this.paginaAree() * this.AREE_PER_PAGINA;
    return this.areeTematiche.slice(start, start + this.AREE_PER_PAGINA);
  }

  // ===================== METODI DI NAVIGAZIONE =====================
  // Ogni metodo imposta il signal alla pagina scelta tramite .set().
  // Vengono chiamati dal template quando l'utente clicca un pallino.

  /** Vai alla pagina i-esima delle challenge. */
  vaiAChallenge(i: number): void { this.paginaChallenge.set(i); }

  /** Vai alla pagina i-esima degli articoli in evidenza. */
  vaiAEvidenza(i: number): void  { this.paginaEvidenza.set(i); }

  /** Vai alla pagina i-esima delle aree tematiche. */
  vaiAAree(i: number): void      { this.paginaAree.set(i); }

  /**
   * Costruttore: inizializza tutte le proprietà del componente.
   * MockDataService viene iniettato tramite il parametro privato 'data'.
   * Tutta la logica di inizializzazione è qui perché i dati sono sincroni
   * (vengono da un servizio mock, non da HTTP).
   */
  constructor(private data: MockDataService) {
    this.areeTematiche = this.data.areeTematiche;
    this.membriTotali  = this.data.statoAdmin.membriTotali;
    this.membriOnline  = this.data.statoAdmin.membriOnline;

    // Filtra solo le challenge attive
    this.challengeAttive = this.data.challenge.filter(c => c.attiva);

    // Filtra solo gli articoli già pubblicati (esclude bozze, archiviati, ecc.)
    this.articoliInEvidenza = this.data.articoli
      .filter(a => a.stato === 'Pubblicato');
  }

  /**
   * Formatta un numero di membri in formato leggibile.
   * Numeri >= 1000 vengono mostrati come "1.2K" invece di "1200".
   * toFixed(1) mantiene una sola cifra decimale.
   */
  formatMembri(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  }

  /**
   * Restituisce il colore esadecimale dell'area corrispondente alla categoria.
   * Se la categoria non viene trovata, usa il viola di default '#6c3ff5'.
   */
  getAreaColore(categoria: string): string {
    const area = this.areeTematiche.find(a => a.nome === categoria);
    return area ? area.colore : '#6c3ff5';
  }

  /**
   * Restituisce il colore di sfondo per il badge dell'area, con opacità ridotta.
   * '22' aggiunto in fondo al colore hex corrisponde a circa 13% di opacità.
   * Esempio: '#ff5733' + '22' → '#ff573322'
   */
  getAreaBadgeStyle(categoria: string): string {
    const colore = this.getAreaColore(categoria);
    return colore + '22';
  }

  /**
   * Restituisce l'emoji/icona associata a un'area tematica.
   * Default '🏆' se l'area non viene trovata (optional chaining + nullish coalescing).
   */
  getAreaIcona(area: string): string {
    return this.areeTematiche.find(a => a.nome === area)?.icona ?? '🏆';
  }
}