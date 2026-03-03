import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MockDataService, Articolo } from '../../../services/mock-data-service';

interface StatCard {
  icon: string;
  label: string;
  value: string;
  delta: string;
  color: string;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  stats: StatCard[] = [
    { icon: 'group',        label: 'Utenti Totali',        value: '12.5K', delta: '+12%', color: 'purple' },
    { icon: 'article',      label: 'Articoli Pubblicati',  value: '847',   delta: '+8%',  color: 'blue'   },
    { icon: 'emoji_events', label: 'Challenge Attive',     value: '5',     delta: '+2',   color: 'orange' },
    { icon: 'trending_up',  label: 'Engagement Rate',      value: '34%',   delta: '+5%',  color: 'green'  },
  ];

  articoli: Articolo[];

  constructor(private data: MockDataService) {
    this.articoli = this.data.articoli;
  }

  getStatoBadgeClass(stato: string): string {
    switch (stato) {
      case 'Pubblicato':   return 'badge-pubblicato';
      case 'Bozza':        return 'badge-bozza';
      case 'In Revisione': return 'badge-revisione';
      default: return '';
    }
  }
}
