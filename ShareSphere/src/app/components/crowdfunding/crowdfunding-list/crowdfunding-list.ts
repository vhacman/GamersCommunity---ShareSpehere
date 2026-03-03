import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MockDataService, CampagnaCrowdfunding } from '../../../services/mock-data-service';

@Component({
  selector: 'app-crowdfunding-list',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
  ],
  templateUrl: './crowdfunding-list.html',
  styleUrl: './crowdfunding-list.css',
})
export class CrowdfundingList {
  campagne: CampagnaCrowdfunding[];

  constructor(private data: MockDataService) {
    this.campagne = this.data.campagne;
  }

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
