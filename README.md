# ShareSphere - Piattaforma Community per Gamers

## Panoramica del Progetto

**ShareSphere** è una piattaforma community per gamers costruita con **Angular** e **Material Design**. La piattaforma permette agli utenti di partecipare a gruppi tematici, sfide (challenge), campagne di crowdfunding e blog. Gli utenti possono connettere i propri account gaming, interagire con altri membri della community e partecipare a eventi e iniziative.

---

## Funzionalità Principali

### 1. Homepage e Aree Tematiche

La homepage rappresenta il punto di ingresso principale dell'applicazione, offrendo una panoramica completa delle attività della community.

**Funzionalità implementate:**
- **Visualizzazione Aree Tematiche**: Nove aree tematiche rappresentate con icone e colori distintivi:
  - 🎮 Giochi 
  - ⚽ Sport 
  - ✈️ Viaggi 
  - ❤️ Inclusione 
  - 🌿 Ambiente 
  - 🎵 Musica
  - 💻 Tecnologia 
  - ⛩️ Anime & Manga
  - 💬 Altro 

- **Challenge Attive**: Sistema di paginazione con navigazione a "dots" (pallini), mostrando 2 challenge per pagina
- **Articoli in Evidenza**: Articoli pubblicati visualizzati con paginazione
- **Statistiche Community**

- **Navigazione**: Link rapidi alle sezioni principali della piattaforma

---

### 2. Sistema di Autenticazione

**Login Form** (`auth/login-form`)

Sistema di autenticazione con validazione locale.

**Funzionalità:**
- Form di accesso con campi username e password
- Validazione credenziali contro utenti mock
- Redirect automatico alla home dopo login riuscito
- Gestione errori per credenziali non valide

**Credenziali di test disponibili:**
| Username | Password   | Ruolo                      |
|----------|------------|----------------------------|
| admin    | admin123   | Amministratore             |
| mod      | mod123     | Moderatore                 |
| creator  | creator123 | Content Creator Verificato |
| user     | user123    | Utente Normale             |

---

### 3. Gestione Profilo Utente

**Profilo** (`profilo/profilo`)

Il profilo utente è il centro di gestione delle informazioni personali e delle impostazioni account.

**Funzionalità:**
- Visualizzazione dati utente:
  - Nome e username
  - Avatar/foto profilo
  - Bio/descrizione personale
  - Ruolo (admin, moderator, content_creator_verificato, user)
  - Statistiche (challenge completate, amici, punti)
- Badge e achievement
- Account gaming collegati con stato di connessione
- Aree di interesse con chips colorati dinamicamente

**Navigazione del profilo:**
- Vista principale (dati completi)
- Vista modifica profilo
- Vista collegamento account gaming

---

**Modifica Profilo** (`profilo/modifica-profilo`)

Modulo per l'aggiornamento dei dati personali con persistenza locale.

**Funzionalità:**
- Modifica nome utente
- Modifica username (con blocco di 30 giorni dopo ogni modifica)
- Modifica descrizione/bio
- Caricamento foto profilo da dispositivo locale (conversione a base64)
- Salvataggio automatico in localStorage
- Feedback visivo dopo il salvataggio

**Dettagli tecnici:**
- Persistenza dei dati nel localStorage del browser
- Calcolo del periodo di blocco username (30 giorni)

---

**Account Collegato** (`profilo/account-collegato`)

Gestione degli account gaming collegati al profilo.

**Funzionalità:**
- Collegamento account delle principali piattaforme:
  - Steam
  - PlayStation
  - Xbox
  - Ubisoft
  - Battle.net
- Ricerca con suggerimenti automatici
- Inserimento email e password per ogni piattaforma
- Salvataggio in localStorage
- Stato di connessione (collegato/non collegato)
- Icone personalizzate per ogni piattaforma

---

### 4. Sistema Gruppi/Community

**Lista Gruppi** (`gruppi/gruppi-list`)

Sistema completo di gestione gruppi community.

**Funzionalità:**
- **Lista gruppi** con anteprima:
  - Nome gruppo
  - Area tematica con colore
  - Descrizione breve
  - Numero membri
  - Immagine copertina
- **Filtro per area tematica**: Selezione dinamica delle aree
- **Ricerca**: Filtro in tempo reale
- **Iscrizione**:
  - Popup di conferma dopo l'iscrizione
  - Aggiornamento contatore membri in tempo reale
- **Creazione nuovo gruppo**:
  - Modal con form dedicato
  - Inserimento nome, area, descrizione
  - Immagine copertina automatica
  - ID univoco generato da timestamp
- **Dettaglio gruppo**: Vista espansa con informazioni complete

**Gruppi disponibili (mock):**

---

### 5. Sistema Challenge

**Lista Challenge** (`challenge/challenge-list`)

Sfide e competizioni della community.

**Funzionalità:**
- Lista completa delle challenge
- **Filtri**:
  - Tutte
  - In corso (attive)
  - Concluse
- **Visualizzazione per ogni challenge**:
  - Titolo
  - Descrizione
  - Area tematica
  - Premio
  - Scadenza
  - Numero partecipanti
  - Progresso verso obiettivo (%)
  - Badge "attiva/conclusa"
- **Calcolo giorni rimanenti**: Sottrazione data scadenza - data attuale

**Challenge disponibili (mock):**
---

**Dettaglio Challenge** (`challenge/challenge-detail`)

Pagina dettagliata per ogni singola challenge.

**Funzionalità:**
- Recupero challenge tramite ID URL
- **Descrizione completa** della challenge
- **Regole** dettagliate
- **Tag** associati per ricerca
- **Premio** della challenge
- **Barra di progresso** partecipanti
- **Challenge correlate**: Max 3 challenge della stessa area
- **Partecipazione**:
  - Pulsante "Partecipa Ora"
  - Aggiornamento contatore partecipanti
  - Signal per tracciare partecipazione utente

---

### 6. Sistema Crowdfunding

**Lista Campagne** (`crowdfunding/crowdfunding-list`)

Raccolta fondi per progetti della community.

**Funzionalità:**
- Lista campagne crowdfunding
- **Progresso verso obiettivo**:
  - Calcolo percentuale
  - Barra di progresso colorata dinamicamente:
    - Verde (#2ecc71) se >= 80%
    - Arancione (#f39c12) se >= 50%
    - Viola (#6c3ff5) se < 50%
- **Visualizzazione**:
  - Titolo
  - Descrizione breve
  - Autore
  - Immagine copertina
  - Obiettivo e raccolto
  - Scadenza
- **Sistema Boost**: Popup per sponsorizzazioni

---

**Dettaglio Campagna** (`crowdfunding/crowdfunding-detail`)

Pagina completa di una campagna crowdfunding.

**Funzionalità:**
- Descrizione estesa del progetto
- **Progresso finanziario** in tempo reale
- **Ricompense disponibili**:
  - Titolo
  - Descrizione
  - Importo minimo
  - Immagine
- **Donazione**:
  - Importo predefinito (25€)
  - Popup conferma donazione
  - Aggiornamento totale raccolto
- **Sistema Boost**: Popup per aumentare visibilità

**Campagne disponibili (mock):**
1. Torneo Spring Legends 2025 - 5.000€ obiettivo
2. Eco-Warriors: Insieme per il Pianeta - 2.000€ obiettivo
3. Viaggi Virtuali: Esplora con Noi - 3.000€ obiettivo

---

**Creazione Campagna** (`crowdfunding/crowdfunding-form`)

Form per la creazione di nuove campagne crowdfunding.

**Funzionalità:**
- **Campi obbligatori**:
  - Titolo
  - Descrizione dettagliata
  - Obiettivo economico
  - Area tematica
  - Data di scadenza
  - Immagine copertina (opzionale)
- **Gestione Ricompense**:
  - Aggiunta dinamica ricompense
  - Rimozione ricompense
  - Campi: titolo, descrizione, importo minimo, immagine
- **Validazione form**
- **Salvataggio**:
  - Creazione ID automatico
  - Redirect alla lista dopo 2 secondi
  - Messaggio di conferma

---

**Boost Popup** (`crowdfunding/boost-popup`)

Sistema di sponsorizzazione delle campagne.

**Funzionalità:**
- Selezione piano di boost
- Opzioni di visibilità premium

---

### 7. Gestione Articoli/Blog

**Dettaglio Articolo** (`articoli/articolo-detail`)

Sistema di blogging della community.

**Funzionalità:**
- Visualizzazione contenuto completo
- **Meta informazioni**:
  - Titolo
  - Categoria
  - Data pubblicazione
  - Autore
  - Stato (Pubblicato, Bozza, In Revisione)
- **Statistiche**:
  - Visualizzazioni
  - Likes
- **Contenuto multi-paragrafo**
- **Articoli correlati**: Suggerimenti basati sulla stessa categoria

**Stati articolo:**
- ✅ Pubblicato
- 📝 Bozza
- 🔍 In Revisione

---

### 8. Pagine di Amministrazione

**Dashboard Admin** (`admin/admin-dashboard`)

Pannello di controllo principale per gli amministratori.

**Funzionalità:**
- **Statistiche globali**
- **Lista articoli** con stato
- Badge colorati per stato

---

**Gestione Articoli** (`admin/admin-articoli`)

CRUD completo per gli articoli del blog.

**Funzionalità:**
- Lista articoli completa
- **Filtro per stato**:
  - Tutti
  - Pubblicato
  - Bozza
  - In Revisione
- Badge visivi per stato
- Azioni di gestione

---

**Gestione Challenge** (`admin/admin-challenge`)

Amministrazione delle challenge della piattaforma.

**Funzionalità:**
- Lista challenge con statistiche
- Visualizzazione partecipanti
- Gestione attive/concluse

---

**Gestione Utenti** (`admin/admin-utenti`)

Pannello di gestione utenti.

**Funzionalità:**
- Lista utenti registrati
- Informazioni dettagliate
- Gestione ruoli

---

**Impostazioni** (`admin/admin-impostazioni`)

Configurazioni di sistema.

---

### 9. Componenti Condivisi (Shared)

**Navbar** (`shared/navbar`)

Barra di navigazione principale.

**Funzionalità:**
- **Links di navigazione**:
  - Home
  - Gruppi
  - Challenge
  - Crowdfunding
- **Popup notifiche**:
  - Badge contatore notifiche non lette
  - Lista notifiche con icone e colori
  - Segna come lette
  - Tipi notifiche: challenge completate, nuovi follower, like, aggiunti a gruppi
- **Menu utente** a tendina
- **Design responsive**
- **Chiusura automatica** popup cliccando fuori

---

**Footer** (`shared/footer`)

Informazioni di footer.

---

**Progress Bar** (`shared/progress-bar`)

Componente riutilizzabile per barre di progresso.

**Funzionalità:**
- Valore percentuale
- Colore personalizzabile
- Animazione transizione

---

**Spazio Pubblicitario** (`shared/spazio-pubblicitario`)

Slot per inserzioni pubblicitarie.

---

### 10. Interfacce/Modelli

Tutti i modelli dati sono centralizzati in `app/model/index.ts`:

```typescript
// Utente e profilo
export interface Utente { ... }
export interface Badge { ... }
export interface AccountGaming { ... }

// Gruppi
export interface Gruppo { ... }
export interface MembroGruppo { ... }

// Crowdfunding
export interface CampagnaCrowdfunding { ... }
export interface Ricompensa { ... }

// Blog
export interface Articolo { ... }

// Challenge
export interface Challenge { ... }
```

---

## Stack Tecnologico

| Tecnologia | Descrizione |
|-----------|-------------|
| **Angular 17+** | Framework frontend con componenti standalone |
| **Angular Material** | Libreria UI componenti |
| **Angular Signals** | State management reattivo |
| **TypeScript** | Tipizzazione statica |
| **SCSS/CSS** | Stili preprocessati |
| **Angular Router** | Navigazione e routing |
| **LocalStorage** | Persistenza dati locale |

---

## Team di Sviluppo

- **Viorica Gabriela Hacman**
- **Domenico Portanova**
- **Carlomaria Lanna**
- **Adriano Mastrobuoni**
- **Angelo Rusu**
- **Jojo de Andrade Rocha**

---

## Note di Sviluppo

- Utilizzo di **Angular Signals** per la reactivity
- Componenti **standalone** (no NgModule)
- TypeScript strict mode
- Design **responsive** con Material Design
- Dati **mock** per testing e sviluppo
- Persistenza **localStorage** per profilo e account

---

## Installazione e Avvio

```bash
# Installazione dipendenze
npm install

# Avvio server sviluppo
ng serve

# Build produzione
ng build
```
