import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MockDataService } from '../../../services/mock-data-service';
import { Articolo } from '../../../model';

@Component({
  selector: 'app-admin-articoli',
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './admin-articoli.html',
  styleUrl: './admin-articoli.css',
})
export class AdminArticoli {
  private data = inject(MockDataService);
  articoli: Articolo[];
  filtroStato = 'Tutti';
  filtri = ['Tutti', 'Pubblicato', 'Bozza', 'In Revisione'];

  constructor() {
    // Carica gli articoli dal servizio mock (copia per evitare modifiche dirette)
    this.articoli = [...this.data.articoli];
  }

  // Getter che restituisce gli articoli filtrati in base allo stato selezionato
  get articoliFiltrati(): Articolo[] {
    if (this.filtroStato === 'Tutti') {
      return this.articoli;
    }
    return this.articoli.filter(a => a.stato === this.filtroStato);
  }

  // Aggiorna il filtro corrente per stato
  setFiltro(stato: string) { this.filtroStato = stato; }

  // Restituisce la classe CSS corrispondente allo stato per il badge
  getStatoBadgeClass(stato: string): string {
    switch (stato) {
      case 'Pubblicato':   return 'badge-pubblicato';
      case 'Bozza':        return 'badge-bozza';
      case 'In Revisione': return 'badge-revisione';
      default: return '';
    }
  }
}
