// ═══════════════════════════════════════════════════════════════════════
// SEZIONE DI: Angelo Rusu
// PRESENTAZIONE: Punto 1.5 - Profilo Utente
//   Vista principale del profilo: avatar, bio, badge, statistiche,
//   aree di interesse con chip colorati.
//   Naviga verso ModificaProfilo e AccountCollegato come sotto-viste.
// ═══════════════════════════════════════════════════════════════════════
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MockDataService } from '../../services/mock-data-service';
import { Utente } from '../../model';
import { ModificaProfilo } from './modifica-profilo/modifica-profilo';
import { AccountCollegato } from './account-collegato/account-collegato';

/**
 * Componente principale della pagina Profilo.
 * Gestisce la navigazione tra tre viste:
 * - Profilo (vista principale)
 * - Modifica Profilo (componente figlio ModificaProfilo)
 * - Collega Account (componente figlio AccountCollegato)
 */
@Component({
  selector: 'app-profilo',
  standalone: true,
  // ModificaProfilo e AccountCollegato sono importati qui perché
  // usati come componenti figli nel template (app-modifica-profilo, app-account-collegato)
  imports: [CommonModule, MatIconModule, ModificaProfilo, AccountCollegato],
  templateUrl: './profilo.html',
  styleUrl: './profilo.css',
})
export class Profilo implements OnInit {

  /** Dati dell'utente corrente.
   *  Il ! (non-null assertion) dice a TypeScript che verrà valorizzato
   *  in ngOnInit, prima che il template lo utilizzi. */
  utente!: Utente;

  /** true quando è aperta la vista di modifica profilo. */
  showModifica = false;

  /** true quando è aperta la vista di collegamento account gaming. */
  showCollega = false;

  /** MockDataService iniettato per accedere ai dati dell'utente e delle aree tematiche. */
  constructor(private data: MockDataService) {}

  /**
   * Hook OnInit: carica il primo utente del mock come utente corrente.
   * In un'app reale qui si farebbe una chiamata HTTP con l'id dell'utente loggato.
   */
  ngOnInit(): void {
    this.utente = this.data.utenti[0];
  }

  /**
   * Restituisce il colore esadecimale dell'area tematica corrispondente al nome.
   * Usato nel template per colorare dinamicamente i chip degli interessi.
   */
  getAreaColore(nome: string): string {
    return this.data.areeTematiche.find(a => a.nome === nome)?.colore ?? '#6c3ff5';
  }

  /**
   * Restituisce l'emoji associata all'area tematica.
   * Default '💬' se l'area non viene trovata.
   */
  getAreaIcona(nome: string): string {
    return this.data.areeTematiche.find(a => a.nome === nome)?.icona ?? '💬';
  }

  /**
   * Restituisce l'emoji associata a una piattaforma gaming.
   * Record<string, string> è un tipo TypeScript per un oggetto con
   * chiavi e valori entrambi stringa — equivalente a { [key: string]: string }.
   * L'operatore ?? restituisce '🎮' come icona generica per piattaforme non mappate.
   */
  getPiattaformaIcona(piattaforma: string): string {
    const icone: Record<string, string> = {
      Steam: '🎮',
      PlayStation: '🎮',
      Xbox: '🟢',
      'Epic Games': '🛡️',
      Ubisoft: '🔷',
      'Battle.net': '⚡',
    };
    return icone[piattaforma] ?? '🎮';
  }

  /**
   * Apre la vista di modifica profilo.
   * Imposta showCollega = false per assicurarsi che le viste
   * non siano mai aperte contemporaneamente.
   */
  apriModifica(): void {
    this.showModifica = true;
    this.showCollega = false;
  }

  /**
   * Apre la vista di collegamento account gaming.
   * Imposta showModifica = false per lo stesso motivo di apriModifica().
   */
  apriCollega(): void {
    this.showCollega = true;
    this.showModifica = false;
  }

  /**
   * Torna alla vista principale del profilo.
   * Azzera entrambi i flag → il primo @if nel template diventa true
   * e mostra di nuovo la card principale.
   */
  tornaProfilo(): void {
    this.showModifica = false;
    this.showCollega = false;
  }
}