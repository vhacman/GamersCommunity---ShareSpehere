import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-collegato',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-collegato.html',
  styleUrl: './account-collegato.css',
})
export class AccountCollegato {

  piattaforme = [
    'Steam',
    'PlayStation',
    'Xbox',
    'Epic Games',
    'Ubisoft',
    'Battle.net'
  ];

  filtro = '';
  suggerimenti: string[] = [];

  email = '';
  password = '';
  messaggio = '';

  cercaPiattaforma() {
    this.suggerimenti = this.piattaforme
      .filter(p => p.toLowerCase().includes(this.filtro.toLowerCase()));
  }

  selezionaPiattaforma(nome: string) {
    this.filtro = nome;
    this.suggerimenti = [];
  }

  collegaAccount() {

    const nuovo = {
      nome: this.filtro,
      email: this.email
    };

    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');

    accounts.push(nuovo);

    localStorage.setItem('accounts', JSON.stringify(accounts));

    this.messaggio = "Account collegato ✔️";

    this.filtro = '';
    this.email = '';
    this.password = '';
  }

}