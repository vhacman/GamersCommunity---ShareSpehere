import { Component, signal, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * Interfaccia che definisce un piano di boost per le campagne crowdfunding.
 * Ogni piano ha: ID univoco, nome, icona, prezzo, durata, lista features, e flag opzionale 'popolare'.
 */
interface PianoBoost {
  id: string;
  nome: string;
  icona: string;
  prezzo: string;
  durata: string;
  features: string[];
  popolare?: boolean;
}

/**
 * Componente popup per la selezione e l'acquisto di un piano boost.
 * Permette agli utenti di scegliere tra tre livelli di boost con diversi vantaggi.
 */
@Component({
  selector: 'app-boost-popup',
  imports: [MatIconModule],
  templateUrl: './boost-popup.html',
  styleUrl: './boost-popup.css',
})
export class BoostPopup {
  // EventEmitter per comunicare al componente padre la richiesta di chiusura del popup
  @Output() chiudi = new EventEmitter<void>();

  // Signal per memorizzare l'ID del piano attualmente selezionato
  pianSelezionato = signal('');
  
  // Signal booleano per tracciare se l'utente ha completato l'acquisto
  boosted = signal(false);

  // Lista dei tre piani di boost disponibili
  piani: PianoBoost[] = [
    {
      id: 'base',
      nome: 'Boost Base',
      icona: 'bolt',
      prezzo: '€4.99',
      durata: '3 giorni',
      features: ['Badge boost visibile', 'Posizione in evidenza nella categoria'],
    },
    {
      id: 'pro',
      nome: 'Boost Pro',
      icona: 'star',
      prezzo: '€9.99',
      durata: '7 giorni',
      features: ['Tutto il Base +', 'Evidenziato in homepage', 'Badge dorato'],
      popolare: true, // Indica che questo piano e il piu popolare
    },
    {
      id: 'ultra',
      nome: 'Boost Ultra',
      icona: 'trending_up',
      prezzo: '€19.99',
      durata: '14 giorni',
      features: ['Tutto il Pro +', 'Banner dedicato in homepage', 'Priorita nelle ricerche', 'Report analytics'],
    },
  ];

  /**
   * Metodo per selezionare un piano di boost.
   * Aggiorna il signal con l'ID del piano scelto.
   */
  selezionaPiano(id: string) { this.pianSelezionato.set(id); }

  /**
   * Conferma l'acquisto del boost se un piano e stato selezionato.
   * Imposta il signal boosted a true per mostrare il messaggio di successo.
   */
  confermaBoost() {
    if (this.pianSelezionato()) {
      this.boosted.set(true);
    }
  }

  /**
   * Chiude il popup e resetta lo stato.
   * Resetta i signal e emite l'evento 'chiudi' al componente padre.
   */
  onChiudi() {
    this.boosted.set(false);
    this.pianSelezionato.set('');
    this.chiudi.emit();
  }
}
