import { Injectable } from '@angular/core';

// ─── INTERFACES ────────────────────────────────────────────────────────────────

export interface Utente {
  id: number;
  nome: string;
  username: string;
  avatar: string;
  bio: string;
  ruolo: 'admin' | 'moderator' | 'content_creator_verificato' | 'user';
  challenge: number;
  amici: number;
  punti: number;
  areeInteresse: string[];
  badge: Badge[];
  accountGaming: AccountGaming[];
}

export interface Badge {
  nome: string;
  colore: string;
  icona: string;
}

export interface AccountGaming {
  piattaforma: string;
  username: string;
  connesso: boolean;
  icona: string;
}

export interface Gruppo {
  id: number;
  nome: string;
  area: string;
  descrizione: string;
  membri: number;
  immagine: string;
  membri_lista: MembroGruppo[];
}

export interface MembroGruppo {
  id: number;
  nome: string;
  avatar: string;
  ruolo: 'Admin' | 'Moderatore' | 'Membro';
}

export interface CampagnaCrowdfunding {
  id: number;
  titolo: string;
  descrizione: string;
  obiettivo: number;
  raggiunto: number;
  autore: string;
  immagine: string;
  ricompense: Ricompensa[];
  scadenza: string;
}

export interface Ricompensa {
  titolo: string;
  descrizione: string;
  importoMinimo: number;
  immagine: string;
}

export interface Articolo {
  id: number;
  titolo: string;
  stato: 'Pubblicato' | 'Bozza' | 'In Revisione';
  visualizzazioni: number;
  likes: number;
  data: string;
  categoria: string;
  immagine: string;
}

export interface Challenge {
  id: number;
  titolo: string;
  descrizione: string;
  area: string;
  premio: string;
  scadenza: string;
  partecipanti: number;
  attiva: boolean;
}

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class MockDataService {

  // ── UTENTI ──────────────────────────────────────────────────────────────────

  utenti: Utente[] = [
    {
      id: 1,
      nome: 'Alessandro R.',
      username: '@ale_gamer_pro',
      avatar: 'https://i.pravatar.cc/150?img=11',
      bio: 'Gamer per passione, community builder per scelta. Amo i giochi cooperativi e credo nel potere delle community positive. Sempre pronto per nuove sfide! 🚀',
      ruolo: 'admin' as const,
      challenge: 12,
      amici: 284,
      punti: 1200,
      areeInteresse: ['Giochi', 'Sport', 'Ambiente'],
      badge: [
        { nome: 'Early Adopter', colore: '#f5a623', icona: '⭐' },
        { nome: 'Challenge Winner', colore: '#9b59b6', icona: '🏆' },
        { nome: 'Top Contributor', colore: '#1abc9c', icona: '🌟' },
        { nome: 'Eco Warrior', colore: '#2ecc71', icona: '🌱' },
      ],
      accountGaming: [
        { piattaforma: 'Steam', username: 'ProGamer2024', connesso: true, icona: '🎮' },
        { piattaforma: 'PlayStation', username: 'Player_IT', connesso: true, icona: '🎮' },
        { piattaforma: 'Xbox', username: '', connesso: false, icona: '🎮' },
      ],
    },
    {
      id: 2,
      nome: 'Giulia M.',
      username: '@giulia_travels',
      avatar: 'https://i.pravatar.cc/150?img=5',
      bio: 'Viaggiatrice seriale e appassionata di fotografia. Condivido le mie avventure con la community!',
      ruolo: 'content_creator_verificato' as const,
      challenge: 7,
      amici: 150,
      punti: 850,
      areeInteresse: ['Viaggi', 'Fotografia'],
      badge: [
        { nome: 'Top Contributor', colore: '#1abc9c', icona: '🌟' },
      ],
      accountGaming: [],
    },
    {
      id: 3,
      nome: 'Luca P.',
      username: '@luca_sport',
      avatar: 'https://i.pravatar.cc/150?img=15',
      bio: 'Sportivo e amante della natura. Sempre in cerca di nuove sfide fisiche!',
      ruolo: 'moderator' as const,
      challenge: 5,
      amici: 98,
      punti: 430,
      areeInteresse: ['Sport', 'Ambiente'],
      badge: [
        { nome: 'Eco Warrior', colore: '#2ecc71', icona: '🌱' },
      ],
      accountGaming: [],
    },
  ];

  // ── GRUPPI ──────────────────────────────────────────────────────────────────

  gruppi: Gruppo[] = [
    {
      id: 1,
      nome: 'Gaming Italia',
      area: 'Giochi',
      descrizione: 'La community italiana dedicata ai gamer! Qui condividiamo esperienze, organizziamo tornei e costruiamo amicizie attraverso la passione per i videogiochi. 🎮',
      membri: 1200,
      immagine: 'https://picsum.photos/seed/gaming/800/300',
      membri_lista: [
        { id: 1, nome: 'Admin Marco', avatar: 'https://i.pravatar.cc/150?img=3', ruolo: 'Admin' },
        { id: 2, nome: 'Giulia M.', avatar: 'https://i.pravatar.cc/150?img=5', ruolo: 'Moderatore' },
        { id: 3, nome: 'Luca P.', avatar: 'https://i.pravatar.cc/150?img=15', ruolo: 'Membro' },
        { id: 4, nome: 'Sara T.', avatar: 'https://i.pravatar.cc/150?img=9', ruolo: 'Membro' },
      ],
    },
    {
      id: 2,
      nome: 'Eco Warriors',
      area: 'Ambiente',
      descrizione: 'Insieme per un pianeta migliore. Condividiamo iniziative green, sfide ambientali e idee sostenibili.',
      membri: 890,
      immagine: 'https://picsum.photos/seed/eco/800/300',
      membri_lista: [
        { id: 1, nome: 'Alessandro R.', avatar: 'https://i.pravatar.cc/150?img=11', ruolo: 'Admin' },
        { id: 3, nome: 'Luca P.', avatar: 'https://i.pravatar.cc/150?img=15', ruolo: 'Membro' },
      ],
    },
    {
      id: 3,
      nome: 'Sport & Vita',
      area: 'Sport',
      descrizione: 'Community di appassionati di sport. Dal calcio alla palestra, dal running al nuoto.',
      membri: 540,
      immagine: 'https://picsum.photos/seed/sport/800/300',
      membri_lista: [
        { id: 3, nome: 'Luca P.', avatar: 'https://i.pravatar.cc/150?img=15', ruolo: 'Admin' },
        { id: 2, nome: 'Giulia M.', avatar: 'https://i.pravatar.cc/150?img=5', ruolo: 'Membro' },
      ],
    },
    {
      id: 4,
      nome: 'Viaggiatori Italiani',
      area: 'Viaggi',
      descrizione: 'Condividi le tue avventure di viaggio, consigli e itinerari con altri appassionati.',
      membri: 320,
      immagine: 'https://picsum.photos/seed/travel/800/300',
      membri_lista: [
        { id: 2, nome: 'Giulia M.', avatar: 'https://i.pravatar.cc/150?img=5', ruolo: 'Admin' },
      ],
    },
    {
      id: 5,
      nome: 'Inclusione & Diversità',
      area: 'Inclusione',
      descrizione: 'Uno spazio sicuro per tutti. Promuoviamo rispetto, inclusione e diversità nella community.',
      membri: 210,
      immagine: 'https://picsum.photos/seed/inclusion/800/300',
      membri_lista: [
        { id: 1, nome: 'Alessandro R.', avatar: 'https://i.pravatar.cc/150?img=11', ruolo: 'Admin' },
      ],
    },
  ];

  // ── CROWDFUNDING ────────────────────────────────────────────────────────────

  campagne: CampagnaCrowdfunding[] = [
    {
      id: 1,
      titolo: 'Torneo Spring Legends 2025',
      descrizione: 'Organizziamo il più grande torneo gaming italiano! Premi esclusivi, streaming live e tanto divertimento per tutta la community.',
      obiettivo: 5000,
      raggiunto: 3750,
      autore: '@ale_gamer_pro',
      immagine: 'https://picsum.photos/seed/torneo/800/400',
      scadenza: '2025-04-30',
      ricompense: [
        { titolo: 'Supporter', descrizione: 'Il tuo nome nei crediti del torneo', importoMinimo: 10, immagine: 'https://picsum.photos/seed/r1/200/200' },
        { titolo: 'Campione', descrizione: 'T-shirt esclusiva + nome nei crediti', importoMinimo: 30, immagine: 'https://picsum.photos/seed/r2/200/200' },
        { titolo: 'Leggenda', descrizione: 'Accesso VIP + kit esclusivo + meet & greet', importoMinimo: 100, immagine: 'https://picsum.photos/seed/r3/200/200' },
      ],
    },
    {
      id: 2,
      titolo: 'Eco-Warriors: Insieme per il Pianeta',
      descrizione: 'Raccogliamo fondi per piantare 1000 alberi in collaborazione con associazioni ambientali locali.',
      obiettivo: 2000,
      raggiunto: 1800,
      autore: '@luca_sport',
      immagine: 'https://picsum.photos/seed/eco2/800/400',
      scadenza: '2025-05-15',
      ricompense: [
        { titolo: 'Verde', descrizione: 'Certificato digitale di adozione albero', importoMinimo: 5, immagine: 'https://picsum.photos/seed/er1/200/200' },
        { titolo: 'Foresta', descrizione: 'Targa personalizzata + certificato', importoMinimo: 25, immagine: 'https://picsum.photos/seed/er2/200/200' },
      ],
    },
    {
      id: 3,
      titolo: 'Viaggi Virtuali: Esplora con Noi',
      descrizione: 'Creiamo una serie di video documentari sui luoghi più belli d\'Italia visitati dalla nostra community.',
      obiettivo: 3000,
      raggiunto: 468,
      autore: '@giulia_travels',
      immagine: 'https://picsum.photos/seed/travel2/800/400',
      scadenza: '2025-06-01',
      ricompense: [
        { titolo: 'Spettatore', descrizione: 'Accesso anticipato ai video', importoMinimo: 15, immagine: 'https://picsum.photos/seed/vr1/200/200' },
        { titolo: 'Protagonista', descrizione: 'Comparsa nel documentario', importoMinimo: 50, immagine: 'https://picsum.photos/seed/vr2/200/200' },
      ],
    },
  ];

  // ── ARTICOLI ────────────────────────────────────────────────────────────────

  articoli: Articolo[] = [
    {
      id: 1,
      titolo: 'Challenge Gaming Marzo 2025',
      stato: 'Pubblicato',
      visualizzazioni: 1234,
      likes: 89,
      data: '15 Mar 2025',
      categoria: 'Giochi',
      immagine: 'https://picsum.photos/seed/art1/400/200',
    },
    {
      id: 2,
      titolo: 'Eco-Warriors: Iniziativa Verde',
      stato: 'Bozza',
      visualizzazioni: 0,
      likes: 0,
      data: '14 Mar 2025',
      categoria: 'Ambiente',
      immagine: 'https://picsum.photos/seed/art2/400/200',
    },
    {
      id: 3,
      titolo: 'Guida al Torneo Primavera',
      stato: 'In Revisione',
      visualizzazioni: 456,
      likes: 23,
      data: '12 Mar 2025',
      categoria: 'Giochi',
      immagine: 'https://picsum.photos/seed/art3/400/200',
    },
    {
      id: 4,
      titolo: 'Viaggi Virtuali: Esplora con Noi',
      stato: 'Pubblicato',
      visualizzazioni: 892,
      likes: 156,
      data: '10 Mar 2025',
      categoria: 'Viaggi',
      immagine: 'https://picsum.photos/seed/art4/400/200',
    },
    {
      id: 5,
      titolo: 'Come migliorare le tue soft skills attraverso il gaming',
      stato: 'Pubblicato',
      visualizzazioni: 2341,
      likes: 234,
      data: '08 Mar 2025',
      categoria: 'Giochi',
      immagine: 'https://picsum.photos/seed/art5/400/200',
    },
  ];

  // ── CHALLENGE ───────────────────────────────────────────────────────────────

  challenge: Challenge[] = [
    {
      id: 1,
      titolo: 'Torneo Spring Legends',
      descrizione: 'Partecipa e vinci premi esclusivi! Il torneo gaming più atteso della primavera.',
      area: 'Giochi',
      premio: 'Kit gaming esclusivo + Badge "Spring Legend"',
      scadenza: '2025-04-30',
      partecipanti: 342,
      attiva: true,
    },
    {
      id: 2,
      titolo: '1000 Alberi per il Pianeta',
      descrizione: 'Completa le sfide ambientali e contribuisci a piantare 1000 alberi.',
      area: 'Ambiente',
      premio: 'Badge "Eco Warrior" + Certificato verde',
      scadenza: '2025-05-15',
      partecipanti: 178,
      attiva: true,
    },
    {
      id: 3,
      titolo: 'Sfida Fotografica: Italia in 30 scatti',
      descrizione: 'Condividi i tuoi scatti più belli dell\'Italia con la community.',
      area: 'Viaggi',
      premio: 'Fotocamera digitale + Badge "Fotografo Pro"',
      scadenza: '2025-03-01',
      partecipanti: 95,
      attiva: false,
    },
    {
      id: 4,
      titolo: 'Maratona di Primavera',
      descrizione: 'Corri almeno 5km al giorno per 30 giorni e condividi i tuoi progressi.',
      area: 'Sport',
      premio: 'Badge "Atleta" + scarpe da running',
      scadenza: '2025-05-31',
      partecipanti: 210,
      attiva: true,
    },
  ];

  // ── STATISTICHE ADMIN ───────────────────────────────────────────────────────

  statoAdmin = {
    utentiTotali: 12500,
    utentiDelta: '+12%',
    articoliPubblicati: 847,
    articoliDelta: '+8%',
    challengeAttive: 5,
    challengeDelta: '+2',
    engagementRate: 34,
    engagementDelta: '+5%',
    membriOnline: 847,
    membriTotali: 12500,
  };

  // ── AREE TEMATICHE ──────────────────────────────────────────────────────────

  areeTematiche = [
    { nome: 'Giochi',     icona: '🎮', colore: '#6c3ff5' },
    { nome: 'Sport',      icona: '⚽', colore: '#e74c3c' },
    { nome: 'Viaggi',     icona: '✈️', colore: '#3498db' },
    { nome: 'Inclusione', icona: '❤️', colore: '#e91e8c' },
    { nome: 'Ambiente',   icona: '🌿', colore: '#2ecc71' },
    { nome: 'Altro',      icona: '💬', colore: '#f39c12' },
  ];

  // ── METODI ──────────────────────────────────────────────────────────────────

  getUtente(id: number) {
    return this.utenti.find(u => u.id === id);
  }

  getGruppo(id: number) {
    return this.gruppi.find(g => g.id === id);
  }

  getCampagna(id: number) {
    return this.campagne.find(c => c.id === id);
  }
}
