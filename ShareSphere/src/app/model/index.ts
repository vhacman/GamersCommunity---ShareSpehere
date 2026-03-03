/**
 * Utente registrato sulla piattaforma.
 * È l'interfaccia principale da cui dipendono quasi tutti i componenti.
 */
export interface Utente {
  id: number;
  nome: string;
  username: string;
  avatar: string;       // URL dell'immagine profilo (es. da pravatar.cc)
  bio: string;          // descrizione/presentazione dell'utente

  /**
   * Ruolo dell'utente nella piattaforma.
   * Union type: TypeScript accetta solo uno di questi quattro valori.
   * Scrivere un valore diverso (es. 'superadmin') causa un errore a compile time.
   */
  ruolo: 'admin' | 'moderator' | 'content_creator_verificato' | 'user';

  challenge: number;         // numero di challenge completate
  amici: number;
  punti: number;
  areeInteresse: string[];   // es. ['Giochi', 'Sport']
  badge: Badge[];            // badge conquistati (vedi interfaccia Badge)
  accountGaming: AccountGaming[];  // account collegati (vedi AccountGaming)
}

/** Badge conquistato da un utente completando attività o challenge. */
export interface Badge {
  nome: string;
  colore: string;   // colore esadecimale (es. '#f5a623') per lo styling del badge
  icona: string;    // emoji visualizzata nel badge (es. '🏆')
}

/** Account gaming collegato al profilo utente (es. Steam, PlayStation, Xbox). */
export interface AccountGaming {
  piattaforma: string;
  username: string;
  connesso: boolean;  // false = account non ancora collegato dall'utente
  icona: string;      // emoji della piattaforma
}

/**
 * Gruppo/community a cui gli utenti possono iscriversi.
 * descrizioneEstesa è opzionale (?): presente solo nei gruppi con pagina dettaglio.
 * I componenti usano l'operatore || per fare fallback:
 *   selectedGroup.descrizioneEstesa || selectedGroup.descrizione
 */
export interface Gruppo {
  id: number;
  nome: string;
  area: string;           // area tematica (es. 'Giochi', 'Sport')
  descrizione: string;    // testo breve per le card lista
  descrizioneEstesa?: string;  // ? = opzionale, testo lungo per la pagina dettaglio
  membri: number;         // contatore membri (incrementato al join)
  immagine: string;       // URL immagine copertina del gruppo
  membri_lista: MembroGruppo[];
}

/**
 * Membro di un gruppo con il suo ruolo interno.
 * Union type con prima lettera maiuscola (convenzione diversa da Utente.ruolo).
 */
export interface MembroGruppo {
  id: number;
  nome: string;
  avatar: string;
  ruolo: 'Admin' | 'Moderatore' | 'Membro';
}

/**
 * Campagna di crowdfunding con obiettivo economico e ricompense per i donatori.
 * La percentuale di avanzamento si calcola con: raggiunto / obiettivo * 100
 * ed è usata come input del componente ProgressBar.
 */
export interface CampagnaCrowdfunding {
  id: number;
  titolo: string;
  descrizione: string;
  obiettivo: number;    // importo target in €
  raggiunto: number;    // importo raccolto finora in €
  autore: string;       // username dell'autore (es. '@ale_gamer_pro')
  immagine: string;
  ricompense: Ricompensa[];
  scadenza: string;     // data in formato stringa (es. '2025-04-30')
}

/** Ricompensa offerta a chi dona almeno importoMinimo a una campagna. */
export interface Ricompensa {
  titolo: string;
  descrizione: string;
  importoMinimo: number;  // soglia minima in € per ricevere questa ricompensa
  immagine: string;
}

/**
 * Articolo del blog con stato editoriale.
 * descrizione e contenuto sono opzionali (?): le bozze ne sono prive.
 * contenuto è un array di paragrafi (string[]) renderizzati separatamente nel template.
 */
export interface Articolo {
  id: number;
  titolo: string;
  descrizione?: string;   // ? = sottotitolo opzionale
  contenuto?: string[];   // ? = array di paragrafi, assente nelle bozze

  /**
   * Stato editoriale dell'articolo.
   * 'Pubblicato' = visibile a tutti
   * 'Bozza'      = non pubblicato, non filtrato nella home
   * 'In Revisione' = in attesa di approvazione admin
   */
  stato: 'Pubblicato' | 'Bozza' | 'In Revisione';

  visualizzazioni: number;
  likes: number;
  data: string;       // data in formato leggibile (es. '15 Mar 2025')
  categoria: string;
  immagine: string;
}

/**
 * Challenge/sfida disponibile sulla piattaforma.
 * Molti campi sono opzionali (?): quelli senza ? sono sempre obbligatori.
 * attiva: false indica una challenge conclusa (scadenza passata).
 */
export interface Challenge {
  id: number;
  titolo: string;
  descrizione: string;
  area: string;
  premio: string;
  scadenza: string;
  partecipanti: number;
  attiva: boolean;        // false = conclusa, non più partecipabile

  immagine?: string;      // ? = opzionale
  obiettivo?: number;     // ? = numero target di partecipanti, opzionale
  regole?: string[];      // ? = lista delle regole, opzionale
  tag?: string[];         // ? = hashtag associati, opzionali
}