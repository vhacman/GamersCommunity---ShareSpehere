# ShareSphere - Gamers Community Platform

## Panoramica del Progetto

ShareSphere è una piattaforma community per gamers costruita con Angular 17+ e Material Design. La piattaforma permette agli utenti di partecipare a gruppi tematici, challenge, crowdfunding e blog.

---

## Componenti e Funzionalità

### 1. Home Page (`home-page`)

**Funzionalità:**
- Visualizzazione aree tematiche (Giochi, Sport, Viaggi, Ambiente, Musica, Tecnologia, Inclusione, Anime & Manga)
- Challenge attive con sistema di paginazione (dots navigation)
- Articoli in evidenza pubblicati
- Statistiche community (membri totali, online)
- Link rapido alle sezioni principali

**Tecnologie:** Angular Signals, MatCard, RouterLink

---

### 2. Profilo Utente (`profilo`)

**Funzionalità:**
- Visualizzazione dati utente (nome, username, avatar, bio, ruolo)
- Badge e account gaming collegati
- Aree di interesse con colori dinamici
- Navigazione tra tre viste: Profilo, Modifica, Collega Account

**Componenti figli:**
- `modifica-profilo`: Form per aggiornare dati utente
- `account-collegato`: Gestione account gaming (Steam, PlayStation, Xbox, Epic Games, Ubisoft, Battle.net)

---

### 3. Gruppi/Community (`gruppi-list`)

**Funzionalità:**
- Lista gruppi con anteprima (nome, area, descrizione, membri)
- Filtro per area tematica
- Iscrizione a gruppi con popup conferma
- Creazione nuovo gruppo tramite modal
- Dettaglio gruppo selezionato
- Gestione ruoli membri (Admin, Moderatore, Membro)

**Funzionalità avanzate:**
- Aggiornamento contatore membri in tempo reale
- Immagini placeholder dinamiche

---

### 4. Challenge (`challenge-list`, `challenge-detail`)

**Funzionalità:**
- Lista challenge con filtro (tutte, in corso, concluse)
- Sistema di progressione partecipanti
- Calcolo giorni rimanenti alla scadenza
- Dettaglio challenge con:
  - Descrizione completa
  - Regole e tag
  - Premio
  - Statistiche partecipanti

**Filtri:**
- Challenge attive
- Challenge concluse

---

### 5. Crowdfunding (`crowdfunding-list`, `crowdfunding-detail`, `crowdfunding-form`)

**Funzionalità:**
- Lista campagne con progresso verso obiettivo
- Progress bar colorata (verde >80%, arancione >50%, viola <50%)
- Dettaglio campagna con:
  - Ricompense disponibili
  - Autore campagna
  - Scadenza
- Form creazione nuova campagna
- Sistema boost con popup

**Componenti figli:**
- `boost-popup`: Popup per scegliere piano boost
- `ricompense-card`: Card per visualizzare ricompense
- `progress-bar`: Barra di progresso riutilizzabile

---

### 6. Articoli/Blog (`articolo-detail`)

**Funzionalità:**
- Visualizzazione dettaglio articolo
- Contenuto multi-paragrafo
- Statistiche (visualizzazioni, likes)
- Categoria e data pubblicazione
- Articoli correlati

**Stati articolo:**
- Pubblicato
- Bozza
- In Revisione

---

### 7. Pagine Admin (`admin-dashboard`, `admin-articoli`, `admin-challenge`, `admin-utenti`, `admin-impostazioni`)

**Admin Dashboard:**
- Statistiche globali:
  - Utenti totali (12.5K)
  - Articoli pubblicati (847)
  - Challenge attive (5)
  - Engagement rate (34%)
- Lista articoli con stato
- Badge colorati per stato

**Gestioni:**
- Articoli: CRUD completo
- Challenge: Gestione e statistiche
- Utenti: Lista e gestione
- Impostazioni: Configurazioni sistema

---

### 8. Autenticazione (`login-form`)

**Funzionalità:**
- Form login con username/password
- Validazione credenziali mock
- Redirect alla home dopo login
- Supporto utenti mock:
  - admin / admin123 (admin)
  - mod / mod123 (moderator)
  - creator / creator123 (content creator verificato)
  - user / user123 (utente normale)

---

### 9. Componenti Shared

#### Navbar (`navbar`)
- Navigazione principale
- Link a tutte le sezioni
- Design responsive

#### Progress Bar (`progress-bar`)
- Componente riutilizzabile
- Colore personalizzabile
- Valore percentuale

#### Spazio Pubblicitario (`spazio-pubblicitario`)
- Slot pubblicitari
- Immagini placeholder

---

## Modelli/Interfacce (`app/model`)

```typescript
Utente, Badge, AccountGaming
Gruppo, MembroGruppo
CampagnaCrowdfunding, Ricompensa
Articolo, Challenge
```

---

## Stack Tecnologico

- **Framework:** Angular 17+ (standalone components)
- **UI Library:** Angular Material
- **State Management:** Angular Signals
- **Styling:** SCSS, CSS
- **Routing:** Angular Router
- **Build:** Angular CLI

---

## Servizi

### MockDataService
Fornisce dati mock per:
- Utenti (3 utenti di test)
- Gruppi (8 gruppi tematici)
- Campagne crowdfunding (3 campagne)
- Articoli (10 articoli)
- Challenge (10 challenge)
- Aree tematiche (9 aree)
- Statistiche admin

---

## Struttura Componenti

```
src/app/components/
├── admin/
│   ├── admin-articoli/
│   ├── admin-challenge/
│   ├── admin-dashboard/
│   ├── admin-impostazioni/
│   ├── admin-layout/
│   └── admin-utenti/
├── articoli/
│   └── articolo-detail/
├── auth/
│   └── login-form/
├── challenge/
│   ├── challenge-detail/
│   └── challenge-list/
├── crowdfunding/
│   ├── boost-popup/
│   ├── crowdfunding-detail/
│   ├── crowdfunding-form/
│   ├── crowdfunding-list/
│   └── ricompense-card/
├── gruppi/
│   ├── gruppi-list/
│   ├── gruppo-chat/
│   ├── gruppo-detail/
│   ├── gruppo-membri/
│   └── gruppo-ruoli/
├── home-page/
│   └── aree-tematiche/
├── profilo/
│   ├── account-collegato/
│   ├── modifica-profilo/
│   ├── profilo-header/
│   └── profilo/
└── shared/
    ├── footer/
    ├── navbar/
    ├── progress-bar/
    └── spazio-pubblicitario/
```

---

## Autori

- **Team:**
  - Viorica Gabriela Hacman
  - Domenico Portanova
  - Carlomaria Lanna
  - Adriano Mastrobuoni
  - Angelo Rusu
  - Jojo de Andrade Rocha

---
