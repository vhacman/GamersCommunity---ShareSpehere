import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MockDataService, CampagnaCrowdfunding } from '../../../services/mock-data-service';
import { BoostPopup } from '../boost-popup/boost-popup';
import { ProgressBar } from '../../shared/progress-bar/progress-bar';
import { SpazioPubblicitario } from '../../shared/spazio-pubblicitario/spazio-pubblicitario';

/**
 * Componente per la visualizzazione della lista delle campagne crowdfunding.
 * Mostra tutte le campagne disponibili con le relative statistiche.
 */
@Component({
  selector: 'app-crowdfunding-list',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    BoostPopup,
    ProgressBar,
    SpazioPubblicitario,
  ],
  templateUrl: './crowdfunding-list.html',
  styleUrl: './crowdfunding-list.css',
})
export class CrowdfundingList {
  // Servizio dati iniettato tramite inject()
  private data = inject(MockDataService);

  // Lista delle campagne crowdfunding caricate dal servizio mock
  campagne: CampagnaCrowdfunding[];
  
  // Signal per gestire l'apertura del popup di boost
  boostPopupAperto = signal(false);

  constructor() {
    this.campagne = this.data.campagne;
  }

  // Apre il popup per scegliere un piano di boost
  apriBoost() { this.boostPopupAperto.set(true); }
  
  // Chiude il popup di boost
  chiudiBoost() { this.boostPopupAperto.set(false); }

  /**
   * Calcola la percentuale di progresso verso l'obiettivo.
   * Limita il valore massimo al 100%.
   */
  getPercentuale(campagna: CampagnaCrowdfunding): number {
    return Math.min(Math.round((campagna.raggiunto / campagna.obiettivo) * 100), 100);
  }

  /**
   * Restituisce il colore della barra di progresso in base alla percentuale:
   * - Verde (#2ecc71) se >= 80%
   * - Arancione (#f39c12) se >= 50%
   * - Viola (#6c3ff5) se < 50%
   */
  getColoreProgressBar(percentuale: number): string {
    if (percentuale >= 80) return '#2ecc71';
    if (percentuale >= 50) return '#f39c12';
    return '#6c3ff5';
  }

  /**
   * Formatta un numero in formato euro italiano (es. 1.000 €).
   */
  formatEuro(valore: number): string {
    return valore.toLocaleString('it-IT') + ' €';
  }
}
