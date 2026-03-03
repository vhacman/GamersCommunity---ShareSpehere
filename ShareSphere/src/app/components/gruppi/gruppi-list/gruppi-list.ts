import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MockDataService } from '../../../services/mock-data-service';
import { Gruppo, MembroGruppo } from '../../../model';
import { SpazioPubblicitario } from "../../shared/spazio-pubblicitario/spazio-pubblicitario";

/**
 * Componente per la visualizzazione e gestione della lista dei gruppi/community.
 *
 * Funzionalità principali:
 * - Visualizza la lista dei gruppi disponibili
 * - Filtra i gruppi per area tematica
 * - Permette di partecipare a un gruppo
 * - Permette di creare un nuovo gruppo tramite modal
 * - Mostra il dettaglio di un gruppo selezionato
 */
@Component({
  selector: 'app-gruppi-list',
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, SpazioPubblicitario],
  templateUrl: './gruppi-list.html',
  styleUrl: './gruppi-list.css',
})
export class GruppiList implements OnInit {

  /** Servizio dati iniettato con la nuova API inject() di Angular 14+.
   *  Alternativa moderna al costruttore: constructor(private svc: MockDataService) */
  private mockDataService = inject(MockDataService);

  /** Lista completa dei gruppi caricati dal servizio. */
  groups: Gruppo[] = [];

  /** Lista delle aree tematiche disponibili, usata per i bottoni filtro.
   *  Include sempre 'All' come prima opzione. */
  areas: string[] = [];

  /** Area attualmente selezionata per il filtro.
   *  'All' significa nessun filtro attivo. */
  filterArea: string = 'All';

  /** Gruppo selezionato dall'utente per la visualizzazione del dettaglio.
   *  null quando si è nella vista lista. */
  selectedGroup: Gruppo | null = null;

  /** Controlla la visibilità del modal per la creazione di un nuovo gruppo. */
  isCreateModalOpen: boolean = false;

  /** Controlla la visibilità del popup di conferma dopo l'iscrizione a un gruppo. */
  isJoinPopupOpen: boolean = false;

  /** Nome del gruppo a cui l'utente si è appena iscritto,
   *  mostrato nel popup di conferma. */
  joinedGroupName: string = '';

  /** Oggetto che raccoglie i dati inseriti nel form di creazione gruppo.
   *  Viene resettato ogni volta che il modal viene chiuso. */
  newGroup = {
    nome: '',
    area: 'Giochi',        // area selezionata di default nel form
    descrizione: '',
    immagine: 'https://picsum.photos/seed/newgroup/800/400'  // immagine placeholder
  };

  /**
   * Hook OnInit: eseguito una sola volta al primo rendering del componente.
   * Carica i gruppi dal servizio e costruisce la lista delle aree disponibili.
   * Set<> elimina automaticamente i duplicati, spread operator crea un array.
   */
  ngOnInit(): void {
    this.groups = this.mockDataService.gruppi;
    this.areas = ['All', ...new Set(this.groups.map((g) => g.area))];
  }

  /**
   * Restituisce il colore esadecimale associato a un'area tematica.
   * Usa l'operatore ?. (optional chaining) per evitare errori se l'area non esiste,
   * e ?? (nullish coalescing) per fornire un colore di default viola.
   */
  getAreaColore(area: string): string {
    return this.mockDataService.areeTematiche.find(a => a.nome === area)?.colore ?? '#6c3ff5';
  }

  /**
   * Restituisce l'emoji/icona associata a un'area tematica.
   * Stessa logica di getAreaColore: default '💬' se l'area non viene trovata.
   */
  getAreaIcona(area: string): string {
    return this.mockDataService.areeTematiche.find(a => a.nome === area)?.icona ?? '💬';
  }

  /**
   * Getter calcolato: restituisce i gruppi filtrati in base a filterArea.
   * Essendo un getter, si aggiorna automaticamente ogni volta che
   * filterArea o groups cambiano (Angular change detection).
   */
  get filteredGroups() {
    return this.filterArea === 'All'
      ? this.groups
      : this.groups.filter(g => g.area === this.filterArea);
  }

  /**
   * Gestisce l'iscrizione dell'utente a un gruppo.
   * event.stopPropagation() impedisce che il click sul bottone "Unisciti"
   * propaghi all'elemento padre e apra il dettaglio del gruppo.
   */
  joinGroup(event: Event, group: Gruppo) {
    event.stopPropagation();
    group.membri++;                    // aggiorna il contatore membri
    this.joinedGroupName = group.nome; // salva il nome per il popup
    this.isJoinPopupOpen = true;       // mostra il popup di conferma
  }

  /** Chiude il popup di conferma iscrizione. */
  closeJoinPopup() {
    this.isJoinPopupOpen = false;
  }

  /**
   * Crea un nuovo gruppo con i dati del form e lo aggiunge alla lista.
   * La guardia iniziale (if) evita di creare gruppi con campi obbligatori vuoti.
   * unshift() aggiunge in cima alla lista invece che in fondo come push().
   * Date.now() genera un ID numerico unico basato sul timestamp corrente.
   */
  createGroup() {
    if (this.newGroup.nome && this.newGroup.descrizione) {
      const groupToAdd: Gruppo = {
        id: Date.now(),
        nome: this.newGroup.nome,
        area: this.newGroup.area,
        descrizione: this.newGroup.descrizione,
        membri: 1,
        immagine: this.newGroup.immagine,
        membri_lista: [{ id: 99, nome: 'You', avatar: 'https://i.pravatar.cc/150?img=11', ruolo: 'Admin' }]
      };

      this.groups.unshift(groupToAdd);
      this.closeModal(); // chiude il modal e resetta il form
    }
  }

  /** Imposta il gruppo selezionato e passa alla vista dettaglio. */
  selectGroup(g: Gruppo) { this.selectedGroup = g; }

  /** Deseleziona il gruppo e torna alla vista lista. */
  backToList() { this.selectedGroup = null; }

  /** Apre il modal di creazione gruppo. */
  openModal() { this.isCreateModalOpen = true; }

  /**
   * Chiude il modal di creazione gruppo e resetta il form ai valori iniziali,
   * così da ripartire da zero alla prossima apertura.
   */
  closeModal() {
    this.isCreateModalOpen = false;
    this.newGroup = { nome: '', area: 'Giochi', descrizione: '', immagine: 'https://picsum.photos/seed/newgroup/800/400' };
  }
}