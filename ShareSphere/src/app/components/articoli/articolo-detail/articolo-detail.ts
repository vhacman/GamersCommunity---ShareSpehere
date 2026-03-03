import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { MockDataService, Articolo } from '../../../services/mock-data-service';

/**
 * Componente per la visualizzazione del dettaglio di un articolo.
 * Recupera l'articolo dall'URL e mostra i relativi articoli correlati.
 */
@Component({
  selector: 'app-articolo-detail',
  imports: [RouterLink, LowerCasePipe],
  templateUrl: './articolo-detail.html',
  styleUrl: './articolo-detail.css',
})
export class ArticoloDetail {
  // Servizi iniettati tramite inject()
  private route = inject(ActivatedRoute);
  private data = inject(MockDataService);

  // Articolo corrente da visualizzare (definito dall'ID nell'URL)
  articolo: Articolo | undefined;
  
  // Lista degli articoli correlati (stessa categoria, escludendo quello corrente)
  correlati: Articolo[] = [];

  constructor() {
    // Sottoscrizione ai parametri dell'URL (l'ID dell'articolo)
    this.route.params.subscribe(params => {
      const id = +params['id']; // Converte l'ID da stringa a numero
      
      // Trova l'articolo corrispondente all'ID
      this.articolo = this.data.articoli.find(a => a.id === id);
      
      // Filtra gli articoli correlati: stessa categoria, escluso l'articolo corrente, solo pubblicati
      this.correlati = this.data.articoli
        .filter(a => a.id !== id && a.categoria === this.articolo?.categoria && a.stato === 'Pubblicato')
        .slice(0, 3); // Limita a massimo 3 articoli correlati
    });
  }

  /**
   * Restituisce il colore associato a una categoria/area tematica.
   * Usa un colore di default (#6c3ff5) se la categoria non viene trovata.
   */
  getAreaColore(categoria: string): string {
    return this.data.areeTematiche.find(a => a.nome === categoria)?.colore ?? '#6c3ff5';
  }

  /**
   * Restituisce l'icona associata a una categoria/area tematica.
   * Usa un'icona di default (📝) se la categoria non viene trovata.
   */
  getAreaIcona(categoria: string): string {
    return this.data.areeTematiche.find(a => a.nome === categoria)?.icona ?? '📝';
  }
}
