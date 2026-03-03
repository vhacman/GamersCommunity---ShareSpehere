import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModificaProfilo } from './modifica-profilo/modifica-profilo';
import { AccountCollegato } from './account-collegato/account-collegato';

@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: [CommonModule, ModificaProfilo, AccountCollegato],
  templateUrl: './profilo.html'
})
export class Profilo implements OnInit {

  // ===============================
  // DATI PROFILO
  // ===============================

  nome = 'Marco Rossi';
  username = '@GamerXPro';
  descrizione = 'Gamer competitivo amante delle challenge online.';
  fotoProfilo = 'https://via.placeholder.com/140';

  // ===============================
  // VISUAL STATE
  // ===============================

  showModifica = false;
  showCollega = false;

  showAllBadges = false;
  showAllAccounts = false;
  showAllInteressi = false;

  // ===============================
  // AREE DI INTERESSE
  // ===============================

  interessi: string[] = [
    '🎮 Giochi',
    '⚽ Sport',
    '🌍 Ambiente',
    '🎵 Musica',
    '💻 Tecnologia',
    '🚗 Motorsport',
    '📚 Lettura'
  ];

  // ===============================
  // BADGE
  // ===============================

  badges = [
    { nome: 'First Win', icona: 'https://cdn-icons-png.flaticon.com/512/2583/2583344.png' },
    { nome: 'Top Player', icona: 'https://cdn-icons-png.flaticon.com/512/2583/2583319.png' },
    { nome: 'Champion', icona: 'https://cdn-icons-png.flaticon.com/512/2583/2583434.png' },
    { nome: 'Speed Runner', icona: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' },
    { nome: 'Elite Rank', icona: 'https://cdn-icons-png.flaticon.com/512/929/929426.png' }
  ];

  // ===============================
  // ICONE PIATTAFORME
  // ===============================

  iconePiattaforme: Record<string, string> = {
    Steam: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
    PlayStation: 'https://cdn-icons-png.flaticon.com/512/5968/5968866.png',
    Xbox: 'https://cdn-icons-png.flaticon.com/512/5968/5968874.png',
    'Epic Games': 'https://cdn-icons-png.flaticon.com/512/5968/5968855.png',
    Ubisoft: 'https://cdn-icons-png.flaticon.com/512/5968/5968847.png',
    'Battle.net': 'https://cdn-icons-png.flaticon.com/512/5968/5968706.png'
  };

  // ===============================
  // ACCOUNT DI DEFAULT
  // ===============================

  accounts: { nome: string }[] = [
    { nome: 'Steam' },
    { nome: 'PlayStation' },
    { nome: 'Xbox' },
    { nome: 'Epic Games' },
    { nome: 'Ubisoft' }
  ];

  // ===============================
  // INIT
  // ===============================

  ngOnInit(): void {
    this.caricaProfilo();
    this.caricaAccounts();
  }

  // ===============================
  // PROFILO
  // ===============================

  caricaProfilo(): void {
    const saved = localStorage.getItem('profilo');
    if (saved) {
      const p = JSON.parse(saved);
      this.nome = p.nome || this.nome;
      this.username = p.username || this.username;
      this.descrizione = p.descrizione || this.descrizione;
      this.fotoProfilo = p.fotoProfilo || this.fotoProfilo;
    }
  }

  // ===============================
  // ACCOUNT
  // ===============================

  caricaAccounts(): void {
    const salvati = JSON.parse(localStorage.getItem('accounts') || 'null');

    if (salvati && salvati.length > 0) {

      // 🔥 Evita duplicati
      const nomiEsistenti = new Set(this.accounts.map(a => a.nome));

      salvati.forEach((acc: any) => {
        if (!nomiEsistenti.has(acc.nome)) {
          this.accounts.push({ nome: acc.nome });
        }
      });
    }
  }

  // ===============================
  // TOGGLE SECTIONS
  // ===============================

  toggleBadges(): void {
    this.showAllBadges = !this.showAllBadges;
  }

  toggleAccounts(): void {
    this.showAllAccounts = !this.showAllAccounts;
  }

  toggleInteressi(): void {
    this.showAllInteressi = !this.showAllInteressi;
  }

  // ===============================
  // NAVIGAZIONE
  // ===============================

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
    this.caricaProfilo();
    this.caricaAccounts();
  }

}