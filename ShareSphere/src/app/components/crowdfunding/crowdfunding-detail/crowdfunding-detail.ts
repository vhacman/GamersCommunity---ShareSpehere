import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MockDataService, CampagnaCrowdfunding, Ricompensa } from '../../../services/mock-data-service';
import { BoostPopup } from '../boost-popup/boost-popup';
import { ProgressBar } from '../../shared/progress-bar/progress-bar';

@Component({
  selector: 'app-crowdfunding-detail',
  imports: [
    RouterLink,
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
  campagna: CampagnaCrowdfunding | undefined;
  boostPopupAperto = signal(false);
  ricompensaPopupAperta = signal(false);
  ricompensaScelta = signal<Ricompensa | null>(null);

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
  chiudiBoost() { this.boostPopupAperto.set(false); }

  apriRicompensa(ricompensa: Ricompensa) {
    this.ricompensaScelta.set(ricompensa);
    this.ricompensaPopupAperta.set(true);
  }

  chiudiRicompensaPopup() {
    this.ricompensaPopupAperta.set(false);
    this.ricompensaScelta.set(null);
  }
}
