import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MockDataService, Articolo, Challenge } from '../../services/mock-data-service';
import { SpazioPubblicitario } from '../shared/spazio-pubblicitario/spazio-pubblicitario';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, LowerCasePipe, MatButtonModule, MatIconModule, MatCardModule, SpazioPubblicitario],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  areeTematiche: typeof this.data.areeTematiche;
  membriTotali: number;
  membriOnline: number;
  challengeAttive: Challenge[];
  articoliInEvidenza: Articolo[];

  paginaChallenge = signal(0);
  paginaEvidenza = signal(0);
  paginaAree = signal(0);
  readonly PER_PAGINA = 2;
  readonly AREE_PER_PAGINA = 6;

  get totalePagineChallenge(): number {
    return Math.ceil(this.challengeAttive.length / this.PER_PAGINA);
  }
  get dotsChallenge(): number[] {
    return Array.from({ length: this.totalePagineChallenge }, (_, i) => i);
  }
  get challengeVisibili(): Challenge[] {
    const start = this.paginaChallenge() * this.PER_PAGINA;
    return this.challengeAttive.slice(start, start + this.PER_PAGINA);
  }

  get totalePagineEvidenza(): number {
    return Math.ceil(this.articoliInEvidenza.length / this.PER_PAGINA);
  }
  get dotsEvidenza(): number[] {
    return Array.from({ length: this.totalePagineEvidenza }, (_, i) => i);
  }
  get evidenzaVisibili(): Articolo[] {
    const start = this.paginaEvidenza() * this.PER_PAGINA;
    return this.articoliInEvidenza.slice(start, start + this.PER_PAGINA);
  }

  get totalePagineAree(): number {
    return Math.ceil(this.areeTematiche.length / this.AREE_PER_PAGINA);
  }
  get dotsAree(): number[] {
    return Array.from({ length: this.totalePagineAree }, (_, i) => i);
  }
  get areeVisibili() {
    const start = this.paginaAree() * this.AREE_PER_PAGINA;
    return this.areeTematiche.slice(start, start + this.AREE_PER_PAGINA);
  }

  vaiAChallenge(i: number): void { this.paginaChallenge.set(i); }
  vaiAEvidenza(i: number): void  { this.paginaEvidenza.set(i); }
  vaiAAree(i: number): void      { this.paginaAree.set(i); }

  constructor(private data: MockDataService) {
    this.areeTematiche = this.data.areeTematiche;
    this.membriTotali = this.data.statoAdmin.membriTotali;
    this.membriOnline = this.data.statoAdmin.membriOnline;
    this.challengeAttive = this.data.challenge.filter(c => c.attiva);
    this.articoliInEvidenza = this.data.articoli
      .filter(a => a.stato === 'Pubblicato');
  }

  formatMembri(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  }

  getAreaColore(categoria: string): string {
    const area = this.areeTematiche.find(a => a.nome === categoria);
    return area ? area.colore : '#6c3ff5';
  }

  getAreaBadgeStyle(categoria: string): string {
    const colore = this.getAreaColore(categoria);
    return colore + '22';
  }

  getAreaIcona(area: string): string {
    return this.areeTematiche.find(a => a.nome === area)?.icona ?? '🏆';
  }
}
