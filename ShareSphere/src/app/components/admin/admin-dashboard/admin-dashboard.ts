import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MockDataService, Articolo } from '../../../services/mock-data-service';

/**
 * Interfaccia per le statistiche mostrate nella dashboard.
 * Ogni stat ha: icona, etichetta, valore, variazione (delta) e colore.
 */
interface StatCard {
  icon: string;
  label: string;
  value: string;
  delta: string;
  color: string;
}

/**
 * Componente per la dashboard admin.
 * Mostra le statistiche globali e l'elenco degli articoli.
 */
@Component({
  selector: 'app-admin-dashboard',
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  // Servizio dati iniettato tramite inject()
  private data = inject(MockDataService);

  // Array delle statistiche mostrate nella dashboard
  stats: StatCard[] = [
    { icon: 'group',        label: 'Utenti Totali',        value: '12.5K', delta: '+12%', color: 'purple' },
    { icon: 'article',      label: 'Articoli Pubblicati',  value: '847',   delta: '+8%',  color: 'blue'   },
    { icon: 'emoji_events', label: 'Challenge Attive',     value: '5',     delta: '+2',   color: 'orange' },
    { icon: 'trending_up',  label: 'Engagement Rate',      value: '34%',   delta: '+5%',  color: 'green'  },
  ];

  // Lista degli articoli caricati dal servizio mock
  articoli: Articolo[];

  constructor() {
    this.articoli = this.data.articoli;
  }

  /**
   * Restituisce la classe CSS appropriata in base allo stato dell'articolo.
   * Usato per colorare diversamente i badge degli stati.
   */
  getStatoBadgeClass(stato: string): string {
    switch (stato) {
      case 'Pubblicato':   return 'badge-pubblicato';
      case 'Bozza':        return 'badge-bozza';
      case 'In Revisione': return 'badge-revisione';
      default: return '';
    }
  }
}
