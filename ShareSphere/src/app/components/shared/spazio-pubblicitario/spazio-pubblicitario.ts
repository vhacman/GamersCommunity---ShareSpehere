import { Component, Input, OnInit } from '@angular/core';

interface Annuncio {
  titolo: string;
  sottotitolo: string;
  cta: string;
  colore: string;
  icona: string;
  sponsor: string;
}

@Component({
  selector: 'app-spazio-pubblicitario',
  imports: [],
  templateUrl: './spazio-pubblicitario.html',
  styleUrl: './spazio-pubblicitario.css',
})
export class SpazioPubblicitario implements OnInit {
  @Input() formato: 'leaderboard' | 'sidebar' | 'inline' = 'inline';

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

  annuncio!: Annuncio;

  ngOnInit() {
    const idx = Math.floor(Math.random() * this.annunci.length);
    this.annuncio = this.annunci[idx];
  }
}
