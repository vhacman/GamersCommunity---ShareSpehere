import { Component, signal } from '@angular/core';
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

interface RicompensaForm {
  titolo: string;
  descrizione: string;
  importoMinimo: number;
  immagine: string;
}

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
  aree = ['Giochi', 'Sport', 'Viaggi', 'Inclusione', 'Ambiente', 'Altro'];

  titolo = signal('');
  descrizione = signal('');
  obiettivo = signal<number>(1000);
  area = signal('');
  scadenza = signal('');
  immagine = signal('');
  inviato = signal(false);

  ricompense = signal<RicompensaForm[]>([
    { titolo: '', descrizione: '', importoMinimo: 10, immagine: '' },
  ]);

  constructor(private data: MockDataService, private router: Router) {}

  aggiungiRicompensa() {
    this.ricompense.update(r => [...r, { titolo: '', descrizione: '', importoMinimo: 10, immagine: '' }]);
  }

  rimuoviRicompensa(index: number) {
    this.ricompense.update(r => r.filter((_, i) => i !== index));
  }

  aggiornaCampoRicompensa(index: number, campo: keyof RicompensaForm, valore: string | number) {
    this.ricompense.update(r => {
      const copia = [...r];
      (copia[index] as any)[campo] = valore;
      return copia;
    });
  }

  formValido(): boolean {
    return (
      this.titolo().trim().length > 0 &&
      this.descrizione().trim().length > 0 &&
      this.obiettivo() > 0 &&
      this.area().length > 0 &&
      this.scadenza().length > 0
    );
  }

  salva() {
    if (!this.formValido()) return;

    const nuovaCampagna = {
      id: this.data.campagne.length + 1,
      titolo: this.titolo(),
      descrizione: this.descrizione(),
      obiettivo: this.obiettivo(),
      raggiunto: 0,
      autore: '@utente_corrente',
      immagine: this.immagine() || 'https://picsum.photos/seed/new/800/400',
      scadenza: this.scadenza(),
      ricompense: this.ricompense().map(r => ({
        ...r,
        immagine: r.immagine || 'https://picsum.photos/seed/reward/200/200',
      })),
    };

    this.data.campagne.push(nuovaCampagna);
    this.inviato.set(true);

    setTimeout(() => {
      this.router.navigate(['/crowdfunding']);
    }, 2000);
  }
}
