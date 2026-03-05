// ═══════════════════════════════════════════════════════════════════════
// SEZIONE DI: Gabriela Hacman (Scrum Master)
// PRESENTAZIONE: Punto 1.4 - Crowdfunding (Dettaglio)
//   Dettaglio campagna: descrizione estesa, ricompense per donatori,
//   donazione (importo default 25 EUR, aggiornamento real-time),
//   popup Boost per la sponsorizzazione premium.
// ═══════════════════════════════════════════════════════════════════════
import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MockDataService } from '../../../services/mock-data-service';
import { CampagnaCrowdfunding, Ricompensa } from '../../../model';
import { BoostPopup } from '../boost-popup/boost-popup';
import { ProgressBar } from '../../shared/progress-bar/progress-bar';

/**
 * Componente per la visualizzazione del dettaglio di una campagna crowdfunding.
 * Mostra descrizione, ricompense, progresso e permette di donare/boostare.
 */
@Component({
  selector: 'app-crowdfunding-detail',
  imports: [
    RouterLink,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    BoostPopup,
    ProgressBar,
  ],
  templateUrl: './crowdfunding-detail.html',
  styleUrl: './crowdfunding-detail.css',
})
export class CrowdfundingDetail implements OnInit {
  // Campagna crowdfunding corrente da visualizzare
  campagna: CampagnaCrowdfunding | undefined;
  
  // Signal per gestire l'apertura dei popup
  boostPopupAperto = signal(false);           // Popup per boostare la campagna
  ricompensaPopupAperta = signal(false);      // Popup per conferma ricompensa selezionata
  donazionePopupAperta = signal(false);       // Popup per la donazione
  
  // Ricompensa attualmente selezionata (nullable)
  ricompensaScelta = signal<Ricompensa | null>(null);
  
  // Importo predefinito per la donazione (25 euro)
  donazioneImporto: number = 25;

  // Costruttore: inietta i servizi per accedere ai parametri URL e ai dati
  constructor(private route: ActivatedRoute, private data: MockDataService) {}

  /**
   * Hook del lifecycle: viene eseguito quando il componente viene inizializzato.
   * Recupera l'ID della campagna dall'URL e carica i dati corrispondenti.
   */
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.campagna = this.data.getCampagna(id);
  }

  /**
   * Calcola la percentuale di progresso verso l'obiettivo.
   * Limita il valore massimo al 100%.
   */
  getPercentuale(): number {
    if (!this.campagna) return 0;
    return Math.min(Math.round((this.campagna.raggiunto / this.campagna.obiettivo) * 100), 100);
  }

  /**
   * Restituisce il colore della barra di progresso in base alla percentuale:
   * - Verde (#2ecc71) se >= 80%
   * - Arancione (#f39c12) se >= 50%
   * - Viola (#6c3ff5) se < 50%
   */
  getColoreProgressBar(): string {
    const p = this.getPercentuale();
    if (p >= 80) return '#2ecc71';
    if (p >= 50) return '#f39c12';
    return '#6c3ff5';
  }

  /**
   * Formatta un numero in formato euro italiano (es. 1.000 €).
   */
  formatEuro(valore: number): string {
    return valore.toLocaleString('it-IT') + ' €';
  }

  // Metodi per aprire/chiudere il popup di boost
  apriBoost() { this.boostPopupAperto.set(true); }
  chiudiBoost() { this.boostPopupAperto.set(false); }

  // Metodi per aprire/chiudere il popup di donazione
  apriDonazione() { this.donazionePopupAperta.set(true); }
  chiudiDonazione() { this.donazionePopupAperta.set(false); }

  /**
   * Conferma la donazione: aggiunge l'importo al totale raccolto
   * e chiude il popup. Resetta l'importo a 25 (valore predefinito).
   */
  confermaDonazione() {
    if (this.campagna && this.donazioneImporto > 0) {
      this.campagna.raggiunto += this.donazioneImporto;
      this.donazionePopupAperta.set(false);
      this.donazioneImporto = 25;
    }
  }

  /**
   * Apre il popup per confermare la ricompensa selezionata.
   * Salva la ricompensa scelta nel signal.
   */
  apriRicompensa(ricompensa: Ricompensa) {
    this.ricompensaScelta.set(ricompensa);
    this.ricompensaPopupAperta.set(true);
  }

  /**
   * Chiude il popup della ricompensa e resetta la selezione.
   */
  chiudiRicompensaPopup() {
    this.ricompensaPopupAperta.set(false);
    this.ricompensaScelta.set(null);
  }
}
