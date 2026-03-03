import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

interface UtenteAdmin {
  iniziali: string;
  nome: string;
  email: string;
  ruolo: string;
  stato: 'Attivo' | 'Sospeso';
  iscritto: string;
  post: number;
}

@Component({
  selector: 'app-admin-utenti',
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './admin-utenti.html',
  styleUrl: './admin-utenti.css',
})
export class AdminUtenti {
  filtroRuolo = signal('Tutti i ruoli');
  ruoli = ['Tutti i ruoli', 'Admin', 'Moderatore', 'Creator', 'Utente'];

  stats = [
    { icon: 'group',       label: 'Totale Utenti',    value: '12,547', color: 'purple' },
    { icon: 'person',      label: 'Utenti Attivi',    value: '11,892', color: 'green'  },
    { icon: 'edit',        label: 'Content Creator',  value: '234',    color: 'teal'   },
    { icon: 'person_off',  label: 'Sospesi',          value: '23',     color: 'red'    },
  ];

  utenti: UtenteAdmin[] = [
    { iniziali: 'MR', nome: 'Marco Rossi',    email: 'marco.rossi@email.com', ruolo: 'Admin',      stato: 'Attivo',  iscritto: '12 Gen 2024', post: 45  },
    { iniziali: 'LB', nome: 'Laura Bianchi',  email: 'laura.b@email.com',     ruolo: 'Moderatore', stato: 'Attivo',  iscritto: '28 Feb 2024', post: 89  },
    { iniziali: 'GV', nome: 'Giuseppe Verdi', email: 'g.verdi@email.com',     ruolo: 'Creator',    stato: 'Attivo',  iscritto: '15 Mar 2024', post: 156 },
    { iniziali: 'AN', nome: 'Anna Neri',      email: 'anna.neri@email.com',   ruolo: 'Utente',     stato: 'Sospeso', iscritto: '03 Apr 2024', post: 12  },
    { iniziali: 'LF', nome: 'Luca Ferrari',   email: 'luca.f@email.com',      ruolo: 'Utente',     stato: 'Attivo',  iscritto: '22 Mag 2025', post: 3   },
  ];

  get utentiFiltrati(): UtenteAdmin[] {
    if (this.filtroRuolo() === 'Tutti i ruoli') return this.utenti;
    return this.utenti.filter(u => u.ruolo === this.filtroRuolo());
  }

  getAvatarColor(ruolo: string): string {
    switch (ruolo) {
      case 'Admin':      return '#7c3aed';
      case 'Moderatore': return '#2563eb';
      case 'Creator':    return '#0891b2';
      default:           return '#6b7280';
    }
  }
}
