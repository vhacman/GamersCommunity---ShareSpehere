import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MockDataService, Articolo } from '../../../services/mock-data-service';

@Component({
  selector: 'app-admin-articoli',
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './admin-articoli.html',
  styleUrl: './admin-articoli.css',
})
export class AdminArticoli {
  articoli: Articolo[];
  filtroStato = 'Tutti';
  filtri = ['Tutti', 'Pubblicato', 'Bozza', 'In Revisione'];

  constructor(private data: MockDataService) {
    this.articoli = [...this.data.articoli];
  }

  get articoliFiltrati(): Articolo[] {
    if (this.filtroStato === 'Tutti') return this.articoli;
    return this.articoli.filter(a => a.stato === this.filtroStato);
  }

  setFiltro(stato: string) { this.filtroStato = stato; }

  getStatoBadgeClass(stato: string): string {
    switch (stato) {
      case 'Pubblicato':   return 'badge-pubblicato';
      case 'Bozza':        return 'badge-bozza';
      case 'In Revisione': return 'badge-revisione';
      default: return '';
    }
  }
}
