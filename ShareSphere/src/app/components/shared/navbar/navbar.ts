import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

/**
 * Interfaccia che descrive la struttura di una notifica.
 * Definire un'interfaccia evita errori di battitura e abilita
 * l'autocompletamento dell'IDE quando si accede alle proprietà.
 */
interface Notifica {
  id: number;        // identificatore univoco
  icona: string;     // nome dell'icona Material (es. 'thumb_up')
  iconaColore: string; // colore esadecimale dell'icona
  testo: string;     // testo della notifica
  tempo: string;     // stringa leggibile del tempo (es. '2 min fa')
  letta: boolean;    // true se l'utente ha già letto la notifica
}

/**
 * Componente della barra di navigazione principale.
 * Gestisce:
 * - I link di navigazione tra le sezioni dell'app
 * - Il popup delle notifiche con contatore badge
 * - Il menu utente a tendina
 */
@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,         // direttiva per i link interni (routerLink)
    RouterLinkActive,   // direttiva per la classe CSS 'active' sul link corrente
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,     // per il contatore rosso sopra l'icona notifiche
    MatMenuModule,      // per il menu a tendina utente
    MatDividerModule,   // per la linea separatrice nel menu
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  /** Signal con il numero di notifiche non lette.
   *  Usato nel template come notifiche() per il badge. */
  notifiche = signal(3);

  /** Signal che controlla la visibilità del popup notifiche. */
  popupAperto = signal(false);

  /** Array dei link mostrati nella navbar centrale.
   *  Aggiungere o rimuovere voci qui aggiorna automaticamente il template. */
  navLinks = [
    { label: 'Home',         path: '/home' },
    { label: 'Gruppi',       path: '/gruppi' },
    { label: 'Challenge',    path: '/challenge' },
    { label: 'Crowdfunding', path: '/crowdfunding' },
  ];

  /** Lista delle notifiche mostrate nel popup.
   *  In un'app reale verrebbe caricata da un servizio HTTP. */
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

  /**
   * @HostListener ascolta eventi sul documento (fuori dal componente).
   * Ogni click sul document chiude il popup, simulando il comportamento
   * classico dei dropdown: click fuori = chiudi.
   * Funziona insieme a stopPropagation() nel wrapper del popup:
   * i click interni al popup vengono bloccati prima di arrivare qui.
   */
  @HostListener('document:click')
  chiudiPopup() {
    this.popupAperto.set(false);
  }

  /**
   * Apre o chiude il popup notifiche al click sull'icona campanella.
   * event.stopPropagation() impedisce che questo click venga intercettato
   * subito dopo da chiudiPopup(), che altrimenti lo richiuderebbe immediatamente.
   * signal.update() calcola il nuovo valore a partire da quello attuale:
   * se era true → false, se era false → true.
   */
  toggleNotifiche(event: Event) {
    event.stopPropagation();
    this.popupAperto.update(v => !v);
  }

  /**
   * Segna tutte le notifiche come lette e azzera il badge.
   * forEach modifica direttamente ogni oggetto nell'array (mutazione).
   * event.stopPropagation() evita che il click chiuda il popup tramite chiudiPopup().
   */
  segnaLette(event: Event) {
    event.stopPropagation();
    this.listaNotifiche.forEach(n => (n.letta = true));
    this.notifiche.set(0); // azzera il contatore badge
  }
}