import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifica-profilo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifica-profilo.html'
})
export class ModificaProfilo implements OnInit {

  nome = '';
  username = '';
  descrizione = '';
  fotoProfilo = '';
  lastUsernameChange: number | null = null;
  usernameBloccato = false;
  messaggio = '';

  ngOnInit(): void {
    const savedProfile = localStorage.getItem('profilo');
    if (savedProfile) {
      const profilo = JSON.parse(savedProfile);
      this.nome = profilo.nome;
      this.username = profilo.username;
      this.descrizione = profilo.descrizione;
      this.fotoProfilo = profilo.fotoProfilo;
      this.lastUsernameChange = profilo.lastUsernameChange;

      if (this.lastUsernameChange) {
        const now = new Date().getTime();
        const giorni = (now - this.lastUsernameChange) / (1000 * 60 * 60 * 24);
        if (giorni < 30) {
          this.usernameBloccato = true;
        }
      }
    }
  }

  salvaProfilo() {
    if (!this.usernameBloccato) {
      this.lastUsernameChange = new Date().getTime();
    }

    const profilo = {
      nome: this.nome,
      username: this.username,
      descrizione: this.descrizione,
      fotoProfilo: this.fotoProfilo,
      lastUsernameChange: this.lastUsernameChange
    };

    localStorage.setItem('profilo', JSON.stringify(profilo));
    this.messaggio = "Profilo aggiornato ✔️";

    if (!this.usernameBloccato) {
      this.usernameBloccato = true;
    }
  }

  caricaFoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoProfilo = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

}