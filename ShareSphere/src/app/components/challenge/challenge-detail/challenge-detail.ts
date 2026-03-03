import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MockDataService, Challenge } from '../../../services/mock-data-service';

@Component({
  selector: 'app-challenge-detail',
  imports: [RouterLink],
  templateUrl: './challenge-detail.html',
  styleUrl: './challenge-detail.css',
})
export class ChallengeDetail {
  challenge: Challenge | undefined;
  correlate: Challenge[] = [];
  partecipato = signal(false);

  constructor(private route: ActivatedRoute, private data: MockDataService) {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.challenge = this.data.challenge.find(c => c.id === id);
      this.correlate = this.data.challenge
        .filter(c => c.id !== id && c.area === this.challenge?.area)
        .slice(0, 3);
    });
  }

  getAreaColore(area: string): string {
    return this.data.areeTematiche.find(a => a.nome === area)?.colore ?? '#6c3ff5';
  }

  getAreaIcona(area: string): string {
    return this.data.areeTematiche.find(a => a.nome === area)?.icona ?? '🏆';
  }

  getProgressoPercentuale(c: Challenge): number {
    if (!c.obiettivo) return 0;
    return Math.min(Math.round((c.partecipanti / c.obiettivo) * 100), 100);
  }

  giorniRimasti(scadenza: string): number {
    const diff = new Date(scadenza).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  partecipa(): void {
    this.partecipato.set(true);
    if (this.challenge) {
      this.challenge.partecipanti += 1;
    }
  }
}
