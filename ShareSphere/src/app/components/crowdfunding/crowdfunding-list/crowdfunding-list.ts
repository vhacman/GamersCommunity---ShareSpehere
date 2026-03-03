import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MockDataService, CampagnaCrowdfunding } from '../../../services/mock-data-service';
import { BoostPopup } from '../boost-popup/boost-popup';
import { ProgressBar } from '../../shared/progress-bar/progress-bar';
import { SpazioPubblicitario } from '../../shared/spazio-pubblicitario/spazio-pubblicitario';

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
  campagne: CampagnaCrowdfunding[];
  boostPopupAperto = signal(false);

  constructor(private data: MockDataService) {
    this.campagne = this.data.campagne;
  }

  apriBoost() { this.boostPopupAperto.set(true); }
  chiudiBoost() { this.boostPopupAperto.set(false); }

  getPercentuale(campagna: CampagnaCrowdfunding): number {
    return Math.min(Math.round((campagna.raggiunto / campagna.obiettivo) * 100), 100);
  }

  getColoreProgressBar(percentuale: number): string {
    if (percentuale >= 80) return '#2ecc71';
    if (percentuale >= 50) return '#f39c12';
    return '#6c3ff5';
  }

  formatEuro(valore: number): string {
    return valore.toLocaleString('it-IT') + ' €';
  }
}
