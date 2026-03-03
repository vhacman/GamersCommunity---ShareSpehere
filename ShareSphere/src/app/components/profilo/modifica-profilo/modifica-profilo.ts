import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Componente per la modifica del profilo utente.
 * I dati vengono salvati e letti dal localStorage del browser,
 * quindi persistono anche dopo il refresh della pagina.
 *
 * Funzionalità principali:
 * - Modifica nome, username, descrizione e foto profilo
 * - Blocca il cambio username per 30 giorni dopo ogni modifica
 * - Carica una foto profilo dal dispositivo e la converte in base64
 */
@Component({
  selector: 'app-modifica-profilo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifica-profilo.html',
  styleUrl: './modifica-profilo.css',
})
export class ModificaProfilo implements OnInit {

  /** Nome visualizzato dell'utente. */
  nome = '';

  /** Username univoco dell'utente. Modificabile al massimo ogni 30 giorni. */
  username = '';

  /** Breve descrizione/bio dell'utente. */
  descrizione = '';

  /** Foto profilo in formato base64 (stringa data URL).
   *  Es: "data:image/jpeg;base64,/9j/4AAQ..." */
  fotoProfilo = '';

  /** Timestamp (millisecondi) dell'ultimo cambio username.
   *  null se l'username non è mai stato cambiato. */
  lastUsernameChange: number | null = null;

  /** true se sono passati meno di 30 giorni dall'ultimo cambio username.
   *  In questo caso il campo username viene disabilitato nel template. */
  usernameBloccato = false;

  /** Messaggio di feedback mostrato all'utente dopo il salvataggio. */
  messaggio = '';

  /**
   * Hook OnInit: carica il profilo salvato dal localStorage al primo rendering.
   * JSON.parse riconverte la stringa JSON salvata nel suo oggetto originale.
   * Controlla poi se il blocco username è ancora attivo calcolando
   * quanti giorni sono passati dall'ultimo cambio.
   */
  ngOnInit(): void {
    const savedProfile = localStorage.getItem('profilo');

    if (savedProfile) {
      const profilo = JSON.parse(savedProfile);

      // Ripristina tutti i campi del form con i valori salvati
      this.nome        = profilo.nome;
      this.username    = profilo.username;
      this.descrizione = profilo.descrizione;
      this.fotoProfilo = profilo.fotoProfilo;
      this.lastUsernameChange = profilo.lastUsernameChange;

      // Calcola se il blocco username è ancora attivo
      if (this.lastUsernameChange) {
        const now = new Date().getTime(); // timestamp attuale in millisecondi
        // Conversione: ms → secondi → minuti → ore → giorni
        const giorni = (now - this.lastUsernameChange) / (1000 * 60 * 60 * 24);

        if (giorni < 30) {
          this.usernameBloccato = true; // blocca il campo nel template
        }
      }
    }
  }

  /**
   * Salva il profilo corrente nel localStorage.
   * Se lo username non era bloccato, aggiorna il timestamp del cambio
   * e attiva il blocco per i prossimi 30 giorni.
   * Mostra un messaggio di conferma all'utente dopo il salvataggio.
   */
  salvaProfilo() {
    // Aggiorna il timestamp solo se l'utente ha potuto modificare lo username
    if (!this.usernameBloccato) {
      this.lastUsernameChange = new Date().getTime();
    }

    // Costruisce l'oggetto da salvare
    const profilo = {
      nome: this.nome,
      username: this.username,
      descrizione: this.descrizione,
      fotoProfilo: this.fotoProfilo,
      lastUsernameChange: this.lastUsernameChange
    };

    // JSON.stringify converte l'oggetto in stringa per il localStorage
    // (localStorage accetta solo stringhe, non oggetti)
    localStorage.setItem('profilo', JSON.stringify(profilo));

    this.messaggio = "Profilo aggiornato ✔️";

    // Blocca lo username dopo il primo salvataggio andato a buon fine
    if (!this.usernameBloccato) {
      this.usernameBloccato = true;
    }
  }

  /**
   * Gestisce il caricamento di una foto profilo dal dispositivo.
   * FileReader legge il file selezionato e lo converte in una stringa
   * base64 (data URL), che può essere usata direttamente come src di un <img>.
   * La conversione avviene in modo asincrono: onload viene chiamato
   * quando la lettura è completata.
   */
  caricaFoto(event: any) {
    const file = event.target.files[0]; // prende il primo file selezionato

    if (file) {
      const reader = new FileReader();

      // Callback asincrona: viene eseguita quando il file è stato letto
      reader.onload = () => {
        // reader.result contiene la stringa base64 del file
        this.fotoProfilo = reader.result as string;
      };

      // Avvia la lettura del file come data URL (base64)
      reader.readAsDataURL(file);
    }
  }
}