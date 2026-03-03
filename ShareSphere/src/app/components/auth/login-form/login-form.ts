import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Lista di utenti mock per il login.
 * In un'applicazione reale, questi dati verrebbero da un backend/API.
 * Ogni utente ha: username, password, ruolo e nome visualizzato.
 */
// Utenti mock (niente backend)
const MOCK_USERS = [
  { username: 'admin',   password: 'admin123',   ruolo: 'admin',                      nome: 'Alessandro R.' },
  { username: 'mod',     password: 'mod123',     ruolo: 'moderator',                  nome: 'Luca P.' },
  { username: 'creator', password: 'creator123', ruolo: 'content_creator_verificato', nome: 'Giulia M.' },
  { username: 'user',    password: 'user123',    ruolo: 'user',                       nome: 'Mario Rossi' },
];

/**
 * Componente per il form di login.
 * Permette agli utenti di accedere tramite username e password.
 */
@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  // Signal per memorizzare i valori dei campi username e password
  // I signal sono reattivi: cambiano automaticamente la UI quando aggiornati
  username = signal('');
  password = signal('');

  // Router iniettato per navigare alla home dopo il login
  constructor(private router: Router) {}

  /**
   * Metodo chiamato quando l'utente clicca sul bottone "Entra".
   * Verifica le credenziali contro la lista MOCK_USERS.
   * Se validi, reindirizza alla home page.
   */
  login() {
    // Cerca un utente con username e password corrispondenti
    const utente = MOCK_USERS.find(
      (u) => u.username === this.username() && u.password === this.password()
    );

    // Se le credenziali sono corrette, naviga alla home
    if (utente) {
      this.router.navigate(['/home']);
    }
  }
}
