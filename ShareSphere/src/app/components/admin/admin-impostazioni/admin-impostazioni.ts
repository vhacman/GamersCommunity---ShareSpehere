import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-impostazioni',
  imports: [MatIconModule, MatButtonModule, MatSlideToggleModule, FormsModule],
  templateUrl: './admin-impostazioni.html',
  styleUrl: './admin-impostazioni.css',
})
export class AdminImpostazioni {
<<<<<<< HEAD
  nomePiattaforma = 'ShareSphere';
  descrizione = 'Dove le passioni diventano persone';
  emailContatto = 'admin@sharesphere.com';
=======
  nomePiattaforma = 'Beyond Gaming';
  descrizione = 'Community gaming platform per gamer appassionati';
  emailContatto = 'admin@beyondgaming.com';
>>>>>>> 03d4c2c2729914d7ed3624145f6d0eda20b640e7

  notifNuoviUtenti = signal(true);
  notifReportContenuti = signal(true);
  notifModerazione = signal(false);
  notifDigest = signal(true);

  temaSelezionato = signal<'chiaro' | 'scuro'>('chiaro');
  coloreSelezionato = signal('#7c3aed');
  colori = ['#7c3aed', '#0891b2', '#ef4444', '#16a34a', '#f59e0b'];

  dbUsato = 2.4;
  dbTotale = 10;
  get dbPercentuale(): number { return (this.dbUsato / this.dbTotale) * 100; }

  apiKey = '••••••••••••••••••••••••••••••••';

  salva() { /* mock save */ }
  rigeneraApiKey() { this.apiKey = '••••••••••••••••••••••••••••••••'; }
  esportaBackup() { /* mock */ }
}
