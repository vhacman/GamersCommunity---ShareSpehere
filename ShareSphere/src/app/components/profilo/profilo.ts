import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MockDataService, Utente } from '../../services/mock-data-service';
import { ModificaProfilo } from './modifica-profilo/modifica-profilo';
import { AccountCollegato } from './account-collegato/account-collegato';

@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: [CommonModule, MatIconModule, ModificaProfilo, AccountCollegato],
  templateUrl: './profilo.html',
  styleUrl: './profilo.css',
})
export class Profilo implements OnInit {
  utente!: Utente;
  showModifica = false;
  showCollega = false;

  constructor(private data: MockDataService) {}

  ngOnInit(): void {
    this.utente = this.data.utenti[0];
  }

  getAreaColore(nome: string): string {
    return this.data.areeTematiche.find(a => a.nome === nome)?.colore ?? '#6c3ff5';
  }

  getAreaIcona(nome: string): string {
    return this.data.areeTematiche.find(a => a.nome === nome)?.icona ?? '💬';
  }

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

  apriModifica(): void {
    this.showModifica = true;
    this.showCollega = false;
  }

  apriCollega(): void {
    this.showCollega = true;
    this.showModifica = false;
  }

  tornaProfilo(): void {
    this.showModifica = false;
    this.showCollega = false;
  }
}
