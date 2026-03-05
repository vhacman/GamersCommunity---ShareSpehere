# SHARESPHERE — SCHEDE PRESENTAZIONE
## Documento da tenere sottocchio durante la demo

---

---

## 1.1 — GIOVANNI
### Introduzione gruppo e progetto

**Cosa dire:**
- Presentare i membri del team (leggere i nomi dalla lista)
- Nome del progetto: **ShareSphere** — piattaforma community per gamers
- Slogan: *"Dove le passioni diventano persone"*
- Il team ha lavorato con metodologia **Scrum** (sprint, backlog, daily standup)
- Ruoli: Product Owner (Domenico), Scrum Master (Gabriela), Developer Team (Carlo, Angelo, Jojo, Adriano)

**Membri del team:**
1. Viorica Gabriela Hacman — Scrum Master
2. Domenico Portanova — Product Owner
3. Carlo Ianna
4. Adriano Mastrobuoni
5. Angelo Rusu
6. Jojo de Andrade Rocha

---

---

## 1.2 — DOMENICO PORTANOVA (Product Owner)
### Homepage + Sistema di Autenticazione

**File di riferimento:**
- `src/app/components/home-page/home-page.ts`
- `src/app/components/auth/login-form/login-form.ts`

---

### LOGIN
**Cosa mostrare:** Aprire l'app — compare il form di login.

**Cosa dire:**
- 4 tipologie di utente: **Admin**, **Moderatore**, **Content Creator Verificato**, **Utente Normale**
- Credenziali di test rapido:
  - `admin` / `admin123`
  - `user` / `user123`
- Dopo il login, redirect automatico alla Homepage
- Niente backend reale: credenziali mock in TypeScript

**Concetto tecnico da citare (se richiesto):**
> Usiamo Angular Signals per i campi username e password: ogni battitura aggiorna il Signal, che aggiorna la UI in modo reattivo senza dover scrivere event listener manuali.

---

### HOMEPAGE
**Cosa mostrare:** Scorrere la homepage dopo il login.

**Cosa dire:**
- Tre sezioni principali: **Aree Tematiche**, **Challenge Attive**, **Articoli in Evidenza**
- Ogni sezione ha una paginazione con pallini (dots) cliccabili
- I dati sono filtrati in tempo reale: solo challenge attive, solo articoli Pubblicati
- Statistica visibile: numero di membri totali e online

**Concetto tecnico da citare (se richiesto):**
> La paginazione usa tre `signal()` separati (uno per sezione). Quando clicchi un pallino, il Signal si aggiorna e Angular ridisegna solo quella sezione — non tutta la pagina.

---

---

## 1.3 — CARLO IANNA
### Gruppi Tematici

**File di riferimento:**
- `src/app/components/gruppi/gruppi-list/gruppi-list.ts`

**Cosa mostrare:** Navigare alla sezione Gruppi.

**Cosa dire:**
- Lista di gruppi filtrabili per **area tematica** (9 aree: Giochi, Sport, Viaggi, ecc.)
- Ogni gruppo ha: nome, area, descrizione, numero di membri, immagine di copertina
- **Iscriversi a un gruppo:** cliccare "Unisciti" — appare popup di conferma, il contatore si aggiorna subito
- **Creare un gruppo:** bottone "Crea Gruppo" — si apre un modal con form (nome, area, descrizione)
- **Vista dettaglio:** cliccando una card si apre il dettaglio del gruppo

**Punti da evidenziare:**
- Il filtro per area usa `filterArea` e un getter `filteredGroups`: nessun metodo extra, solo un getter
- La creazione genera un ID univoco con `Date.now()` (timestamp)
- `event.stopPropagation()` sul bottone "Unisciti" evita che il click apra il dettaglio del gruppo

**Concetto tecnico da citare (se richiesto):**
> Usiamo `inject()` invece del costruttore per iniettare il servizio dati — è la nuova API moderna di Angular 14+ che rende il codice più leggibile.

---

---

## 1.4 — GABRIELA HACMAN (Scrum Master)
### Crowdfunding + Challenge

**File di riferimento:**
- `src/app/components/challenge/challenge-list/challenge-list.ts`
- `src/app/components/challenge/challenge-detail/challenge-detail.ts`
- `src/app/components/crowdfunding/crowdfunding-list/crowdfunding-list.ts`
- `src/app/components/crowdfunding/crowdfunding-detail/crowdfunding-detail.ts`
- `src/app/components/crowdfunding/crowdfunding-form/crowdfunding-form.ts`

---

### CHALLENGE
**Cosa mostrare:** Navigare alla sezione Challenge.

**Cosa dire:**
- Tre modalita di visualizzazione: **Tutte** / **In Corso** / **Concluse**
- Per ogni challenge attiva: barra di progresso partecipanti e **countdown giorni rimasti** (calcolato in tempo reale)
- Cliccare una challenge: pagina di dettaglio con regole, premio, challenge correlate (stessa area, max 3)
- Bottone **"Partecipa Ora"**: incrementa il contatore e registra la partecipazione

**Concetto tecnico da citare (se richiesto):**
> Il filtro usa `computed()`: un Signal derivato che si ricalcola automaticamente ogni volta che cambia il Signal `filtro`. Non dobbiamo chiamare nessun metodo — Angular sa da solo quando aggiornare la lista.

---

### CROWDFUNDING
**Cosa mostrare:** Navigare alla sezione Crowdfunding.

**Cosa dire:**
- Ogni campagna mostra: titolo, autore, obiettivo, importo raccolto, scadenza
- **Barra di progresso cromatica:**
  - Viola: meno del 50% raggiunto
  - Arancione: tra 50% e 80%
  - Verde: oltre 80%
- **Dettaglio campagna:** descrizione estesa, ricompense per i donatori con importo minimo
- **Donazione:** importo default 25 EUR, aggiornamento real-time del totale raccolto
- **Boost:** popup per sponsorizzare la campagna con piani di visibilita premium
- **Crea campagna:** form guidato con validazione, redirect automatico dopo il salvataggio

**Concetto tecnico da citare (se richiesto):**
> Il colore della barra di progresso viene calcolato dinamicamente da `getColoreProgressBar()`: nessun CSS fisso, tutto in TypeScript in base alla percentuale raggiunta.

---

---

## 1.5 — ANGELO RUSU
### Profilo Utente

**File di riferimento:**
- `src/app/components/profilo/profilo.ts`
- `src/app/components/profilo/modifica-profilo/modifica-profilo.ts`
- `src/app/components/profilo/account-collegato/account-collegato.ts`

**Cosa mostrare:** Navigare al Profilo dal menu utente in navbar.

---

### SCHEDA PROFILO
**Cosa dire:**
- Mostra: avatar, nome, username, bio, ruolo, badge ottenuti
- Statistiche: challenge completate, amici, punti
- Aree di interesse con **chip colorati dinamicamente** (ogni area ha il suo colore)
- Due azioni disponibili: "Modifica Profilo" e "Collega Account"

---

### MODIFICA PROFILO
**Cosa mostrare:** Cliccare "Modifica Profilo".

**Cosa dire:**
- Si possono modificare: nome, username, bio, foto profilo
- **Blocco username:** dopo ogni cambio, il campo e disabilitato per **30 giorni**
- La foto si carica dal dispositivo e viene convertita in **base64** per essere salvata
- Tutti i dati vengono salvati nel **localStorage**: persistono anche dopo il refresh

**Concetto tecnico da citare (se richiesto):**
> `FileReader` converte l'immagine caricata in una stringa base64. Il localStorage accetta solo stringhe, per questo usiamo `JSON.stringify` per salvare oggetti e `JSON.parse` per rilegerli.

---

### ACCOUNT GAMING COLLEGATI
**Cosa mostrare:** Tornare al profilo, cliccare "Collega Account".

**Cosa dire:**
- Si possono collegare account di: Steam, PlayStation, Xbox, Epic Games, Ubisoft, Battle.net
- Ricerca con **suggerimenti automatici** mentre si digita
- Gli account collegati vengono salvati in localStorage

---

---

## 1.6 — JOJO DE ANDRADE ROCHA
### Admin: Dashboard + Articoli + Utenti

**File di riferimento:**
- `src/app/components/admin/admin-dashboard/admin-dashboard.ts`
- `src/app/components/admin/admin-articoli/admin-articoli.ts`
- `src/app/components/admin/admin-utenti/admin-utenti.ts`

**Come accedere:** Login con `admin` / `admin123`, poi navigare alla sezione Admin.

**Cosa dire (intro):**
- Il pannello admin e accessibile **solo al ruolo admin** (Angular Router protegge le route)
- Ha un layout dedicato con **navigazione laterale** separata dal resto dell'app
- Questa architettura permette di aggiungere nuove sezioni admin semplicemente registrando nuove route

---

### DASHBOARD
**Cosa mostrare:** La dashboard principale dell'admin.

**Cosa dire:**
- 4 card di statistiche: Utenti Totali, Articoli Pubblicati, Challenge Attive, Engagement Rate
- Ogni card mostra il delta (variazione rispetto al periodo precedente)
- Sotto le stats: lista di tutti gli articoli con il loro stato

---

### GESTIONE ARTICOLI
**Cosa mostrare:** Navigare ad "Articoli" nel menu laterale.

**Cosa dire:**
- Lista articoli con filtro per stato: **Tutti / Pubblicato / Bozza / In Revisione**
- Badge colorati per ogni stato (verde = pubblicato, grigio = bozza, arancione = in revisione)
- Menu azioni per ogni articolo (modifica, elimina, cambia stato)
- Flusso editoriale: i contenuti non vanno online direttamente, passano per la revisione

---

### GESTIONE UTENTI
**Cosa mostrare:** Navigare ad "Utenti" nel menu laterale.

**Cosa dire:**
- 4 card statistiche: Totale Utenti (12.547), Attivi (11.892), Content Creator (234), Sospesi (23)
- Tabella utenti con filtro per ruolo: Admin, Moderatore, Creator, Utente
- Avatar colorato per ruolo (viola=admin, blu=moderatore, teal=creator, grigio=utente)
- Stato Attivo/Sospeso visibile per ogni utente

**Concetto tecnico da citare (se richiesto):**
> Il filtro utenti usa un Angular Signal con `signal()` e un getter `utentiFiltrati`. Il getter si ricalcola automaticamente ogni volta che cambia il Signal del filtro.

---

---

## 1.7 — ADRIANO MASTROBUONI
### Admin: Challenge + Impostazioni + Shared Components

**File di riferimento:**
- `src/app/components/admin/admin-challenge/admin-challenge.ts`
- `src/app/components/admin/admin-impostazioni/admin-impostazioni.ts`
- `src/app/components/shared/navbar/navbar.ts`
- `src/app/components/shared/progress-bar/progress-bar.ts`
- `src/app/components/shared/spazio-pubblicitario/spazio-pubblicitario.ts`

---

### ADMIN CHALLENGE
**Cosa mostrare:** Navigare a "Challenge" nel menu admin.

**Cosa dire:**
- Lista di tutte le challenge con stato attiva/conclusa
- Statistiche aggregate: numero challenge attive, totale partecipanti (somma di tutte)
- Menu azioni per ogni challenge (modifica, elimina, attiva/disattiva)

---

### ADMIN IMPOSTAZIONI
**Cosa mostrare:** Navigare a "Impostazioni" nel menu admin.

**Cosa dire:**
- Configurazione piattaforma: nome, email di contatto
- **Notifiche admin** con toggle on/off (Angular Material SlideToggle)
- Scelta tema chiaro/scuro e colore primario (5 palette disponibili)
- Monitoraggio storage database con barra di utilizzo
- Gestione API key con opzione di rigenerazione
- Export backup dati

---

### SHARED COMPONENTS
**Cosa dire:**
- Tre componenti condivisi usati in tutta la piattaforma:

**1. Navbar**
- Link rapidi: Home, Gruppi, Challenge, Crowdfunding
- Badge notifiche con contatore (3 non lette)
- Popup notifiche categorizzate: challenge, follower, like, gruppi
- Menu utente a tendina con accesso a profilo e impostazioni
- Popup si chiude al click fuori (`@HostListener('document:click')`)

**2. ProgressBar (componente riutilizzabile)**
- Accetta 3 parametri: `[percentuale]`, `[colore]`, `[altezza]`
- Usata in Challenge e Crowdfunding senza riscrivere il codice
- Esempio del principio **component-based**: scrivi una volta, usa ovunque

**3. SpazioPubblicitario**
- Slot riservato a banner pubblicitari nelle pagine principali

**Concetto tecnico da citare (se richiesto):**
> `@HostListener('document:click')` ascolta i click sull'intero documento. Ogni click chiude il popup notifiche. I click interni al popup usano `stopPropagation()` per non essere intercettati da questo listener — simulando il comportamento classico dei dropdown.

---

---

## CHEAT SHEET — CREDENZIALI DI TEST

| Username   | Password     | Ruolo                     | Accesso Admin |
|------------|--------------|---------------------------|---------------|
| `admin`    | `admin123`   | Amministratore            | SI            |
| `mod`      | `mod123`     | Moderatore                | NO            |
| `creator`  | `creator123` | Content Creator Verificato| NO            |
| `user`     | `user123`    | Utente Normale            | NO            |

---

## CHEAT SHEET — STRUTTURA FILE PROGETTO

```
src/app/
├── components/
│   ├── auth/           → login-form           [DOMENICO]
│   ├── home-page/      → home-page            [DOMENICO]
│   ├── gruppi/         → gruppi-list          [CARLO]
│   ├── challenge/      → challenge-list, challenge-detail  [GABRIELA]
│   ├── crowdfunding/   → list, detail, form, boost-popup   [GABRIELA]
│   ├── profilo/        → profilo, modifica-profilo, account-collegato [ANGELO]
│   ├── articoli/       → articolo-detail      [JOJO]
│   ├── admin/
│   │   ├── admin-layout/      → layout laterale   [ADRIANO]
│   │   ├── admin-dashboard/   → dashboard         [JOJO]
│   │   ├── admin-articoli/    → gestione articoli [JOJO]
│   │   ├── admin-utenti/      → gestione utenti   [JOJO]
│   │   ├── admin-challenge/   → gestione challenge [ADRIANO]
│   │   └── admin-impostazioni/→ impostazioni      [ADRIANO]
│   └── shared/
│       ├── navbar/            → navbar            [ADRIANO]
│       ├── progress-bar/      → barra progresso   [ADRIANO]
│       └── spazio-pubblicitario/ → slot ads       [ADRIANO]
├── services/
│   └── mock-data-service.ts  → tutti i dati mock
└── model/
    └── index.ts              → interfacce TypeScript
```

---

## CONCETTI TECNICI DA TENERE PRONTI

| Concetto | Spiegazione breve |
|---|---|
| **Angular Signals** | Variabili reattive: quando cambiano, Angular aggiorna solo la parte di UI che le usa |
| **computed()** | Signal derivato: si ricalcola automaticamente quando cambiano i Signal da cui dipende |
| **inject()** | Modo moderno (Angular 14+) per iniettare servizi senza costruttore |
| **standalone components** | Niente NgModule: ogni componente dichiara le proprie dipendenze |
| **localStorage** | Storage del browser per persistere dati tra sessioni (usato per profilo e account gaming) |
| **MockDataService** | Servizio centrale che contiene tutti i dati mock (sostituisce un backend reale) |
| **HostListener** | Ascolta eventi DOM globali (es. click sul documento) dall'interno di un componente |
| **@Input()** | Decoratore per ricevere dati dal componente padre (usato in ProgressBar) |
