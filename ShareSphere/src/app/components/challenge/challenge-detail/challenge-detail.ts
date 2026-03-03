import { Component, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MockDataService } from '../../../services/mock-data-service';
import { Challenge } from '../../../model';

/**
 * Componente per la visualizzazione del dettaglio di una challenge.
 * Recupera la challenge dall'URL, mostra le relative challenge correlate
 * e gestisce la partecipazione.
 */
@Component({
  selector: 'app-challenge-detail',
  imports: [RouterLink],
  templateUrl: './challenge-detail.html',
  styleUrl: './challenge-detail.css',
})
export class ChallengeDetail {
  // Servizi iniettati tramite inject()
  private route = inject(ActivatedRoute);
  private data = inject(MockDataService);

  // Challenge corrente da visualizzare (definita dall'ID nell'URL)
  challenge: Challenge | undefined;
  
  // Lista delle challenge correlate (stessa area, max 3)
  correlate: Challenge[] = [];
  
  // Signal booleano per tracciare se l'utente ha gia partecipato
  partecipato = signal(false);

  constructor() {
    // Sottoscrizione ai parametri dell'URL (l'ID della challenge)
    this.route.params.subscribe(params => {
      const id = +params['id']; // Converte l'ID da stringa a numero
      
      // Trova la challenge corrispondente all'ID
      this.challenge = this.data.challenge.find(c => c.id === id);
      
      // Filtra le challenge correlate: stessa area, escludendo quella corrente
      this.correlate = this.data.challenge
        .filter(c => c.id !== id && c.area === this.challenge?.area)
        .slice(0, 3); // Limita a massimo 3 challenge correlate
    });
  }

  /**
   * Restituisce il colore associato a un'area tematica.
   * Usa un colore di default (#6c3ff5) se l'area non viene trovata.
   */
  getAreaColore(area: string): string {
    return this.data.areeTematiche.find(a => a.nome === area)?.colore ?? '#6c3ff5';
  }

  /**
   * Restituisce l'icona associata a un'area tematica.
   * Usa un'icona di default (🏆) se l'area non viene trovata.
   */
  getAreaIcona(area: string): string {
    return this.data.areeTematiche.find(a => a.nome === area)?.icona ?? '🏆';
  }

  /**
   * Calcola la percentuale di progresso verso l'obiettivo di partecipanti.
   * Limita il valore massimo al 100% (non puo superare l'obiettivo).
   */
  getProgressoPercentuale(c: Challenge): number {
    if (!c.obiettivo) return 0; // Se non c'e obiettivo, ritorna 0
    return Math.min(Math.round((c.partecipanti / c.obiettivo) * 100), 100);
  }

  /**
   * Calcola i giorni rimasti fino alla scadenza della challenge.
   * Ritorna 0 se la scadenza e passata.
   */
  giorniRimasti(scadenza: string): number {
    // Differenza tra data di scadenza e data attuale in millisecondi
    const diff = new Date(scadenza).getTime() - Date.now();
    // Converte in giorni (arrotondato per eccesso) e limita a minimo 0
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  /**
   * Metodo chiamato quando l'utente clicca su "Partecipa Ora".
   * Imposta il signal a true e incrementa il contatore partecipanti.
   */
  partecipa(): void {
    this.partecipato.set(true); // Segna l'utente come partecipante
    if (this.challenge) {
      this.challenge.partecipanti += 1; // Incrementa il numero di partecipanti
    }
  }
}
