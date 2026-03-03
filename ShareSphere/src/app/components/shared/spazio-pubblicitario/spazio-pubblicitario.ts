import { Component, Input, OnInit } from '@angular/core';

/**
 * Interfaccia che descrive la struttura di un annuncio pubblicitario.
 */
interface Annuncio {
  titolo: string;      // nome del prodotto pubblicizzato
  sottotitolo: string; // breve descrizione o claim
  cta: string;         // testo del bottone call-to-action (es. 'Scopri di più')
  colore: string;      // colore del brand, usato per personalizzare il banner
  icona: string;       // emoji rappresentativa del prodotto
  sponsor: string;     // nome del brand/sponsor
}

/**
 * Componente riutilizzabile per mostrare un banner pubblicitario.
 * Seleziona casualmente un annuncio dalla lista ad ogni caricamento.
 *
 * Supporta tre formati layout tramite l'@Input() formato:
 * - 'leaderboard' → banner orizzontale largo (es. in fondo alla pagina)
 * - 'sidebar'     → banner verticale (es. nella colonna laterale)
 * - 'inline'      → banner compatto dentro il contenuto (default)
 *
 * Esempio d'uso:
 *   <app-spazio-pubblicitario formato="leaderboard" />
 */
@Component({
  selector: 'app-spazio-pubblicitario',
  imports: [],
  templateUrl: './spazio-pubblicitario.html',
  styleUrl: './spazio-pubblicitario.css',
})
export class SpazioPubblicitario implements OnInit {

  /** Formato del banner: determina quale classe CSS viene applicata nel template.
   *  Il tipo union 'leaderboard' | 'sidebar' | 'inline' impedisce a TypeScript
   *  di accettare valori non previsti (es. formato="banner" darebbe errore). */
  @Input() formato: 'leaderboard' | 'sidebar' | 'inline' = 'inline';

  /** Lista di annunci disponibili.
   *  private: non accessibile dall'esterno, usata solo internamente
   *  per selezionare casualmente l'annuncio da mostrare. */
  private annunci: Annuncio[] = [
    {
      titolo: 'SteelSeries Apex Pro',
      sottotitolo: 'La tastiera meccanica dei campioni. Scopri la nuova serie 2025.',
      cta: 'Scopri di più',
      colore: '#f97316',
      icona: '⌨️',
      sponsor: 'SteelSeries',
    },
    {
      titolo: 'PlayStation Plus',
      sottotitolo: 'Accedi a oltre 700 giochi. Primo mese gratuito per nuovi iscritti.',
      cta: 'Prova gratis',
      colore: '#2563eb',
      icona: '🎮',
      sponsor: 'PlayStation',
    },
    {
      titolo: 'Razer DeathAdder V3',
      sottotitolo: 'Precisione estrema. Il mouse preferito dai pro player.',
      cta: 'Acquista ora',
      colore: '#16a34a',
      icona: '🖱️',
      sponsor: 'Razer',
    },
    {
      titolo: 'MSI Gaming Monitor',
      sottotitolo: '240Hz, 1ms, QHD. Vinci ogni frame.',
      cta: 'Vedi offerta',
      colore: '#dc2626',
      icona: '🖥️',
      sponsor: 'MSI',
    },
  ];

  /** Annuncio selezionato casualmente, mostrato nel template.
   *  Il ! dice a TypeScript che verrà valorizzato in ngOnInit
   *  prima che il template lo utilizzi. */
  annuncio!: Annuncio;

  /**
   * Hook OnInit: seleziona un annuncio casuale dalla lista.
   *
   * Come funziona la selezione casuale:
   *   Math.random()           → numero decimale tra 0 (incluso) e 1 (escluso)
   *   * this.annunci.length   → scala il numero tra 0 e 3.999...
   *   Math.floor(...)         → arrotonda per difetto → indice intero 0, 1, 2 o 3
   */
  ngOnInit() {
    const idx = Math.floor(Math.random() * this.annunci.length);
    this.annuncio = this.annunci[idx];
  }
}