import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

interface Notifica {
  id: number;
  icona: string;
  iconaColore: string;
  testo: string;
  tempo: string;
  letta: boolean;
}

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  notifiche = signal(3);
  popupAperto = signal(false);

  navLinks = [
    { label: 'Home',         path: '/home' },
    { label: 'Gruppi',       path: '/gruppi' },
    { label: 'Challenge',    path: '/challenge' },
    { label: 'Crowdfunding', path: '/crowdfunding' },
  ];

  listaNotifiche: Notifica[] = [
    {
      id: 1,
      icona: 'emoji_events',
      iconaColore: '#f5a623',
      testo: 'Hai completato la challenge "Torneo Spring Legends"!',
      tempo: '2 min fa',
      letta: false,
    },
    {
      id: 2,
      icona: 'person_add',
      iconaColore: '#6c3ff5',
      testo: '@giulia_travels ha iniziato a seguirti',
      tempo: '1 ora fa',
      letta: false,
    },
    {
      id: 3,
      icona: 'thumb_up',
      iconaColore: '#3498db',
      testo: 'Il tuo articolo ha ricevuto 10 nuovi like',
      tempo: '3 ore fa',
      letta: false,
    },
    {
      id: 4,
      icona: 'group',
      iconaColore: '#2ecc71',
      testo: 'Sei stato aggiunto al gruppo "Tech & Dev"',
      tempo: 'Ieri',
      letta: true,
    },
    {
      id: 5,
      icona: 'campaign',
      iconaColore: '#e74c3c',
      testo: 'Nuova challenge disponibile: "Game Jam 2025"',
      tempo: 'Ieri',
      letta: true,
    },
  ];

  @HostListener('document:click')
  chiudiPopup() {
    this.popupAperto.set(false);
  }

  toggleNotifiche(event: Event) {
    event.stopPropagation();
    this.popupAperto.update(v => !v);
  }

  segnaLette(event: Event) {
    event.stopPropagation();
    this.listaNotifiche.forEach(n => (n.letta = true));
    this.notifiche.set(0);
  }
}
