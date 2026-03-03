import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Utenti mock (niente backend)
const MOCK_USERS = [
  { username: 'admin', password: 'admin123', ruolo: 'admin', nome: 'Admin User' },
  { username: 'mario', password: 'mario123', ruolo: 'user', nome: 'Mario Rossi' },
  { username: 'giulia', password: 'giulia123', ruolo: 'user', nome: 'Giulia Bianchi' },
];

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
  username = signal('');
  password = signal('');
  errorMessage = signal('');

  constructor(private router: Router) {}

  login() {
    const utente = MOCK_USERS.find(
      (u) => u.username === this.username() && u.password === this.password()
    );

    if (utente) {
      this.errorMessage.set('');
      this.router.navigate(['/home']);
    } else {
      this.errorMessage.set('Username o password errati.');
    }
  }
}
