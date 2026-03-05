// ═══════════════════════════════════════════════════════════════════════
// SEZIONE DI: Gabriela Hacman (Scrum Master)
// PRESENTAZIONE: Punto 1.4 - Challenge (Lista)
//   Lista challenge con filtro: tutte / in corso / concluse.
//   Barra di progresso partecipanti e countdown giorni rimasti.
//   Usa Angular Signals + computed() per il filtraggio reattivo.
// ═══════════════════════════════════════════════════════════════════════
import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MockDataService } from '../../../services/mock-data-service';
import { Challenge } from '../../../model';

@Component({
  selector: 'app-challenge-list',
  imports: [RouterLink],
  templateUrl: './challenge-list.html',
  styleUrl: './challenge-list.css',
})
export class ChallengeList {
  tutte: Challenge[];
  filtro = signal<'tutte' | 'in-corso' | 'concluse'>('tutte');

  challengeFiltrate = computed(() => {
    if (this.filtro() === 'in-corso') return this.tutte.filter(c => c.attiva);
    if (this.filtro() === 'concluse') return this.tutte.filter(c => !c.attiva);
    return this.tutte;
  });

  get attiveCount(): number {
    return this.tutte.filter(c => c.attiva).length;
  }

  constructor(private data: MockDataService) {
    this.tutte = this.data.challenge;
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
}
