import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MockDataService, Challenge } from '../../../services/mock-data-service';

@Component({
  selector: 'app-admin-challenge',
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './admin-challenge.html',
  styleUrl: './admin-challenge.css',
})
export class AdminChallenge {
  challenge: Challenge[];

  constructor(private data: MockDataService) {
    this.challenge = [...this.data.challenge];
  }

  get attive(): number { return this.challenge.filter(c => c.attiva).length; }
  get totPartecipanti(): number { return this.challenge.reduce((s, c) => s + c.partecipanti, 0); }
}
