// ═══════════════════════════════════════════════════════════════════════
// SEZIONE DI: Adriano Mastrobuoni
// PRESENTAZIONE: Punto 1.7 - Shared / ProgressBar
//   Componente riutilizzabile: accetta [percentuale], [colore], [altezza].
//   Usato in Challenge e Crowdfunding — scritto una volta, usato ovunque.
//   Getter percentualeClampata garantisce il range [0, 100].
// ═══════════════════════════════════════════════════════════════════════
import { Component, Input } from '@angular/core';

/**
 * Componente riutilizzabile per una barra di avanzamento personalizzabile.
 * Accetta tre Input per controllare aspetto e valore:
 *
 * Esempio d'uso nel template padre:
 *   <app-progress-bar [percentuale]="75" [colore]="'#e74c3c'" [altezza]="10" />
 */
@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css',
})
export class ProgressBar {

  /** Percentuale di riempimento della barra (0–100).
   *  Il valore viene poi "clampato" dal getter per garantire
   *  che non esca mai dall'intervallo valido. */
  @Input() percentuale: number = 0;

  /** Colore della barra in formato CSS (es. '#6c3ff5', 'red', 'rgb(...)').
   *  Viene applicato come [style.background] nel template. */
  @Input() colore: string = '#6c3ff5';

  /** Altezza della barra in pixel.
   *  Viene applicata come [style.height.px] nel template. */
  @Input() altezza: number = 14;

  /**
   * Getter che restituisce la percentuale garantita nell'intervallo [0, 100].
   * "Clampare" un valore significa bloccarlo tra un minimo e un massimo.
   *
   * Come funziona:
   *   Math.max(percentuale, 0)   → impedisce valori negativi (es. -10 → 0)
   *   Math.min(..., 100)         → impedisce valori oltre 100 (es. 150 → 100)
   *
   * Usare un getter invece di modificare percentuale direttamente
   * preserva il valore originale passato dal padre.
   */
  get percentualeClampata(): number {
    return Math.min(Math.max(this.percentuale, 0), 100);
  }
}