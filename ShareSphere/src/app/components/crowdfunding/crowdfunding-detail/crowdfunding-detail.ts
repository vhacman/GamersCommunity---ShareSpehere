import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MockDataService, CampagnaCrowdfunding } from '../../../services/mock-data-service';

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
  selector: 'app-crowdfunding-detail',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './crowdfunding-detail.html',
  styleUrl: './crowdfunding-detail.css',
})
export class CrowdfundingDetail implements OnInit {
  campagna: CampagnaCrowdfunding | undefined;
  boostPopupAperto = signal(false);
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

  constructor(private route: ActivatedRoute, private data: MockDataService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.campagna = this.data.getCampagna(id);
  }

  getPercentuale(): number {
    if (!this.campagna) return 0;
    return Math.min(Math.round((this.campagna.raggiunto / this.campagna.obiettivo) * 100), 100);
  }

  getColoreProgressBar(): string {
    const p = this.getPercentuale();
    if (p >= 80) return '#2ecc71';
    if (p >= 50) return '#f39c12';
    return '#6c3ff5';
  }

  formatEuro(valore: number): string {
    return valore.toLocaleString('it-IT') + ' €';
  }

  apriBoost() { this.boostPopupAperto.set(true); }

  chiudiBoost() {
    this.boostPopupAperto.set(false);
    this.boosted.set(false);
    this.pianSelezionato.set('');
  }

  selezionaPiano(id: string) { this.pianSelezionato.set(id); }

  confermaBoost() {
    if (this.pianSelezionato()) {
      this.boosted.set(true);
    }
  }
}
