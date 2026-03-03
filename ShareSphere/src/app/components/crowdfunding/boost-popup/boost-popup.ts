import { Component, signal, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface PianoBoost {
  id: string;
  nome: string;
  icona: string;
  prezzo: string;
  durata: string;
  features: string[];
  popolare?: boolean;
}

@Component({
  selector: 'app-boost-popup',
  imports: [MatIconModule],
  templateUrl: './boost-popup.html',
  styleUrl: './boost-popup.css',
})
export class BoostPopup {
  @Output() chiudi = new EventEmitter<void>();

  pianSelezionato = signal('');
  boosted = signal(false);

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
      popolare: true,
    },
    {
      id: 'ultra',
      nome: 'Boost Ultra',
      icona: 'trending_up',
      prezzo: '€19.99',
      durata: '14 giorni',
      features: ['Tutto il Pro +', 'Banner dedicato in homepage', 'Priorità nelle ricerche', 'Report analytics'],
    },
  ];

  selezionaPiano(id: string) { this.pianSelezionato.set(id); }

  confermaBoost() {
    if (this.pianSelezionato()) {
      this.boosted.set(true);
    }
  }

  onChiudi() {
    this.boosted.set(false);
    this.pianSelezionato.set('');
    this.chiudi.emit();
  }
}
