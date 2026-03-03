import { Component, signal, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MockDataService } from '../../../services/mock-data-service';

/**
 * Interfaccia che definisce la struttura di una ricompensa nel form.
 * Ogni ricompensa ha: titolo, descrizione, importo minimo richiesto e URL immagine.
 */
interface RicompensaForm {
  titolo: string;
  descrizione: string;
  importoMinimo: number;
  immagine: string;
}

/**
 * Componente per la creazione di una nuova campagna crowdfunding.
 * Permette di compilare un form con i dettagli della campagna e le ricompense.
 */
@Component({
  selector: 'app-crowdfunding-form',
  imports: [
    RouterLink,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    DecimalPipe,
  ],
  templateUrl: './crowdfunding-form.html',
  styleUrl: './crowdfunding-form.css',
})
export class CrowdfundingForm {
  // Servizi iniettati tramite inject()
  private data = inject(MockDataService);
  private router = inject(Router);

  // Lista delle aree tematiche disponibili per la campagna
  aree = ['Giochi', 'Sport', 'Viaggi', 'Inclusione', 'Ambiente', 'Altro'];

  // Signal per i campi del form (reactive: aggiornano la UI automaticamente)
  titolo = signal('');              // Titolo della campagna
  descrizione = signal('');        // Descrizione dettagliata
  obiettivo = signal<number>(1000); // Obiettivo economico (default 1000 euro)
  area = signal('');               // Area tematica selezionata
  scadenza = signal('');           // Data di scadenza
  immagine = signal('');            // URL immagine copertina
  inviato = signal(false);         // Stato: true dopo l'invio del form

  // Signal array per le ricompense (si parte con una vuota)
  ricompense = signal<RicompensaForm[]>([
    { titolo: '', descrizione: '', importoMinimo: 10, immagine: '' },
  ]);

  /**
   * Aggiunge una nuova ricompensa vuota alla lista.
   * Viene chiamata quando l'utente clicca "Aggiungi" nella sezione ricompense.
   */
  aggiungiRicompensa() {
    this.ricompense.update(r => [...r, { titolo: '', descrizione: '', importoMinimo: 10, immagine: '' }]);
  }

  /**
   * Rimuove una ricompensa dalla lista in base all'indice.
   * Non permette di rimuovere se e l'unica ricompensa.
   */
  rimuoviRicompensa(index: number) {
    this.ricompense.update(r => r.filter((_, i) => i !== index));
  }

  /**
   * Aggiorna un campo specifico di una ricompensa.
   * Riceve: indice della ricompensa, nome del campo, nuovo valore.
   */
  aggiornaCampoRicompensa(index: number, campo: keyof RicompensaForm, valore: string | number) {
    this.ricompense.update(r => {
      const copia = [...r];
      (copia[index] as any)[campo] = valore;
      return copia;
    });
  }

  /**
   * Valida il form: controlla che tutti i campi obbligatori siano compilati.
   * Ritorna true se il form e valido, false altrimenti.
   */
  formValido(): boolean {
    return (
      this.titolo().trim().length > 0 &&
      this.descrizione().trim().length > 0 &&
      this.obiettivo() > 0 &&
      this.area().length > 0 &&
      this.scadenza().length > 0
    );
  }

  /**
   * Salva la nuova campagna nel servizio dati mock.
   * Crea un oggetto campagna con i valori del form, lo aggiunge all'array
   * e reindirizza alla lista delle campagne dopo 2 secondi.
   */
  salva() {
    // Se il form non e valido, non fare nulla
    if (!this.formValido()) return;

    // Crea l'oggetto nuova campagna
    const nuovaCampagna = {
      id: this.data.campagne.length + 1,
      titolo: this.titolo(),
      descrizione: this.descrizione(),
      obiettivo: this.obiettivo(),
      raggiunto: 0, // Parte da 0
      autore: '@utente_corrente', // Utente fittizio
      // Usa URL immagine inserita o immagine default
      immagine: this.immagine() || 'https://picsum.photos/seed/new/800/400',
      scadenza: this.scadenza(),
      // Mappa le ricompense con immagine default se non inserita
      ricompense: this.ricompense().map(r => ({
        ...r,
        immagine: r.immagine || 'https://picsum.photos/seed/reward/200/200',
      })),
    };

    // Aggiunge la campagna all'array nel servizio mock
    this.data.campagne.push(nuovaCampagna);
    
    // Imposta lo stato a "inviato" per mostrare il messaggio di successo
    this.inviato.set(true);

    // Dopo 2 secondi, reindirizza alla lista delle campagne
    setTimeout(() => {
      this.router.navigate(['/crowdfunding']);
    }, 2000);
  }
}
