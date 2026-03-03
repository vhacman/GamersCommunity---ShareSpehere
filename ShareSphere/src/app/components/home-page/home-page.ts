import { Component } from '@angular/core';
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
  challengeAttiva: Challenge | undefined;
  articoliInEvidenza: Articolo[];

  constructor(private data: MockDataService) {
    this.areeTematiche = this.data.areeTematiche;
    this.membriTotali = this.data.statoAdmin.membriTotali;
    this.membriOnline = this.data.statoAdmin.membriOnline;
    this.challengeAttiva = this.data.challenge.find(c => c.attiva);
    this.articoliInEvidenza = this.data.articoli
      .filter(a => a.stato === 'Pubblicato')
      .slice(0, 4);
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
}
