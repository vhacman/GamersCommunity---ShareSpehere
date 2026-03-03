import { Injectable } from '@angular/core';

// ─── INTERFACCE ────────────────────────────────────────────────────────────────
// Le interfacce definiscono la "forma" degli oggetti usati nell'app.
// TypeScript le usa solo in fase di compilazione: spariscono nel bundle finale.
// Esportarle (export interface) permette agli altri componenti di importarle
// e usarle come tipo nelle loro proprietà e metodi.

/** Rappresenta un utente registrato sulla piattaforma. */
export interface Utente {
  id: number;
  nome: string;
  username: string;
  avatar: string;       // URL dell'immagine profilo
  bio: string;
  /** Union type: il ruolo può essere solo uno di questi quattro valori. */
  ruolo: 'admin' | 'moderator' | 'content_creator_verificato' | 'user';
  challenge: number;    // numero di challenge completate
  amici: number;
  punti: number;
  areeInteresse: string[];
  badge: Badge[];
  accountGaming: AccountGaming[];
}

/** Badge conquistato da un utente completando challenge o attività. */
export interface Badge {
  nome: string;
  colore: string;   // colore esadecimale usato per styling del badge
  icona: string;    // emoji dell'icona
}

/** Account gaming collegato al profilo utente (es. Steam, PlayStation). */
export interface AccountGaming {
  piattaforma: string;
  username: string;
  connesso: boolean;  // false = account non ancora collegato
  icona: string;
}

/** Gruppo/community con lista membri e descrizione opzionale estesa. */
export interface Gruppo {
  id: number;
  nome: string;
  area: string;
  descrizione: string;
  descrizioneEstesa?: string;  // ? = campo opzionale, può essere undefined
  membri: number;
  immagine: string;
  membri_lista: MembroGruppo[];
}

/** Membro di un gruppo con il suo ruolo interno. */
export interface MembroGruppo {
  id: number;
  nome: string;
  avatar: string;
  /** Union type: il ruolo nel gruppo è uno di questi tre valori. */
  ruolo: 'Admin' | 'Moderatore' | 'Membro';
}

/** Campagna di crowdfunding con obiettivo economico e ricompense per i donatori. */
export interface CampagnaCrowdfunding {
  id: number;
  titolo: string;
  descrizione: string;
  obiettivo: number;    // importo target in €
  raggiunto: number;    // importo raccolto finora in €
  autore: string;
  immagine: string;
  ricompense: Ricompensa[];
  scadenza: string;     // data in formato stringa (es. '2025-04-30')
}

/** Ricompensa offerta ai donatori di una campagna crowdfunding. */
export interface Ricompensa {
  titolo: string;
  descrizione: string;
  importoMinimo: number;  // donazione minima per ottenere questa ricompensa
  immagine: string;
}

/** Articolo del blog con contenuto opzionale e stato di pubblicazione. */
export interface Articolo {
  id: number;
  titolo: string;
  descrizione?: string;    // opzionale: non tutti gli articoli hanno sottotitolo
  contenuto?: string[];    // array di paragrafi, opzionale (assente nelle bozze)
  /** Union type: stato editoriale dell'articolo. */
  stato: 'Pubblicato' | 'Bozza' | 'In Revisione';
  visualizzazioni: number;
  likes: number;
  data: string;
  categoria: string;
  immagine: string;
}

/** Challenge/sfida disponibile sulla piattaforma. */
export interface Challenge {
  id: number;
  titolo: string;
  descrizione: string;
  area: string;
  premio: string;
  scadenza: string;
  partecipanti: number;
  attiva: boolean;         // false = challenge conclusa, non più partecipabile
  immagine?: string;       // opzionale
  obiettivo?: number;      // numero target di partecipanti, opzionale
  regole?: string[];       // lista delle regole, opzionale
  tag?: string[];          // hashtag associati, opzionali
}

// ─── SERVIZIO DATI MOCK ────────────────────────────────────────────────────────

/**
 * Servizio che simula un backend fornendo dati statici a tutti i componenti.
 * providedIn: 'root' lo rende un singleton: Angular crea una sola istanza
 * condivisa da tutta l'applicazione (tutti i componenti vedono gli stessi dati).
 *
 * In un'app reale questo servizio farebbe chiamate HTTP a una vera API REST.
 */
@Injectable({ providedIn: 'root' })
export class MockDataService {

  // ── UTENTI ──────────────────────────────────────────────────────────────────
  // 'as const' sul ruolo garantisce che TypeScript inferisca il tipo letterale
  // ('admin') invece del tipo generico (string), rispettando l'union type dell'interfaccia.

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
        { nome: 'Early Adopter',    colore: '#f5a623', icona: '⭐' },
        { nome: 'Challenge Winner', colore: '#9b59b6', icona: '🏆' },
        { nome: 'Top Contributor',  colore: '#1abc9c', icona: '🌟' },
        { nome: 'Eco Warrior',      colore: '#2ecc71', icona: '🌱' },
      ],
      accountGaming: [
        { piattaforma: 'Steam',       username: 'ProGamer2024', connesso: true,  icona: '🎮' },
        { piattaforma: 'PlayStation', username: 'Player_IT',    connesso: true,  icona: '🎮' },
        { piattaforma: 'Xbox',        username: '',             connesso: false, icona: '🎮' },
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
  // descrizioneEstesa è presente solo in alcuni gruppi (campo opzionale).
  // I componenti usano l'operatore || per fare fallback sulla descrizione breve.

  gruppi: Gruppo[] = [
    {
      id: 1,
      nome: 'Gaming Italia',
      area: 'Giochi',
      descrizione: 'La community italiana dedicata ai gamer! Qui condividiamo esperienze, organizziamo tornei e costruiamo amicizie attraverso la passione per i videogiochi. 🎮',
      descrizioneEstesa: 'Gaming Italia è la più grande community di gamer italiani. Nata nel 2019, conta oggi oltre 1200 membri attivi provenienti da tutta Italia.\n\nLa nostra missione è creare un ambiente inclusivo dove i gamer di tutti i livelli possano incontrarsi, condividere esperienze e migliorare insieme. Organizziamo tornei settimanali, sessioni di gioco co-op e discussioni sui titoli più popolari.\n\nChe tu sia un competitivo esperto o un casual gamer, troverai il tuo posto qui. Abbiamo canali dedicati per ogni genere: FPS, RPG, MOBA, racing e molto altro.',
      membri: 1200,
      immagine: 'https://picsum.photos/seed/gaming/800/300',
      membri_lista: [
        { id: 1, nome: 'Admin Marco', avatar: 'https://i.pravatar.cc/150?img=3',  ruolo: 'Admin' },
        { id: 2, nome: 'Giulia M.',   avatar: 'https://i.pravatar.cc/150?img=5',  ruolo: 'Moderatore' },
        { id: 3, nome: 'Luca P.',     avatar: 'https://i.pravatar.cc/150?img=15', ruolo: 'Membro' },
        { id: 4, nome: 'Sara T.',     avatar: 'https://i.pravatar.cc/150?img=9',  ruolo: 'Membro' },
      ],
    },
    {
      id: 2,
      nome: 'Eco Warriors',
      area: 'Ambiente',
      descrizione: 'Insieme per un pianeta migliore. Condividiamo iniziative green, sfide ambientali e idee sostenibili.',
      descrizioneEstesa: 'Eco Warriors è la community per chi vuole fare la differenza. Crediamo che piccole azioni quotidiane, moltiplicate per migliaia di persone, possano cambiare il mondo.\n\nOrganizziamo pulizie di parchi e spiagge, promuoviamo il riciclaggio consapevole, condividiamo consigli per uno stile di vita più sostenibile e sosteniamo iniziative green sul territorio italiano.\n\nAbbiamo anche un programma di sfide mensili: riduci la plastica, usa mezzi sostenibili, pianta un albero. Ogni membro può proporre la propria sfida!',
      membri: 890,
      immagine: 'https://picsum.photos/seed/eco/800/300',
      membri_lista: [
        { id: 1, nome: 'Alessandro R.', avatar: 'https://i.pravatar.cc/150?img=11', ruolo: 'Admin' },
        { id: 3, nome: 'Luca P.',       avatar: 'https://i.pravatar.cc/150?img=15', ruolo: 'Membro' },
      ],
    },
    {
      id: 3,
      nome: 'Sport & Vita',
      area: 'Sport',
      descrizione: 'Community di appassionati di sport. Dal calcio alla palestra, dal running al nuoto.',
      descrizioneEstesa: 'Sport & Vita riunisce atleti di ogni livello e disciplina. Che tu sia un maratoneta, un sollevatore, un giocatore di calcio o un appassionato di yoga, questo è il tuo posto.\n\nCondividiamo allenamenti, consigli nutrizionali, eventi sportivi e motivazione quotidiana. Organizziamo giri in bici, corse collettive, partite di calcetto e molto altro nelle principali città italiane.\n\nIl nostro motto: lo sport unisce, migliora e diverte. Non importa il livello, quello che conta è muoversi!',
      membri: 540,
      immagine: 'https://picsum.photos/seed/sport/800/300',
      membri_lista: [
        { id: 3, nome: 'Luca P.',   avatar: 'https://i.pravatar.cc/150?img=15', ruolo: 'Admin' },
        { id: 2, nome: 'Giulia M.', avatar: 'https://i.pravatar.cc/150?img=5',  ruolo: 'Membro' },
      ],
    },
    {
      id: 4,
      nome: 'Viaggiatori Italiani',
      area: 'Viaggi',
      descrizione: 'Condividi le tue avventure di viaggio, consigli e itinerari con altri appassionati.',
      descrizioneEstesa: 'Viaggiatori Italiani è la community per chi esplora il mondo (e l\'Italia!) con curiosità e passione.\n\nQui trovi: itinerari dettagliati, consigli su dove dormire e mangiare, trucchi per risparmiare, e soprattutto persone pronte a partire con te.\n\nOrganizziamo viaggi di gruppo due volte all\'anno: una meta italiana e una estera. Dall\'Eremo di San Giacomo alle spiagge di Zanzibar, ogni destinazione è aperta!\n\nCondividi le tue foto, racconta le tue esperienze e ispirati alle avventure degli altri membri.',
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
      descrizioneEstesa: 'Inclusione & Diversità è uno spazio sicuro creato per celebrare le differenze e costruire una community più aperta e accogliente.\n\nCrediamo che la diversità sia una forza. In questo gruppo trovi supporto, condivisione e sensibilizzazione su temi come l\'accessibilità, l\'uguaglianza di genere, i diritti LGBTQ+ e molto altro.\n\nOrganizziamo eventi, webinar con esperti, gruppi di supporto e iniziative sul territorio per promuovere una società più inclusiva.\n\nQui ogni voce conta. Rispetto, empatia e apertura sono i nostri valori fondamentali.',
      membri: 210,
      immagine: 'https://picsum.photos/seed/inclusion/800/300',
      membri_lista: [
        { id: 1, nome: 'Alessandro R.', avatar: 'https://i.pravatar.cc/150?img=11', ruolo: 'Admin' },
      ],
    },
    {
      id: 6,
      nome: 'Sound & Play',
      area: 'Musica',
      descrizione: 'Colonne sonore epiche, playlist da gaming, produzione musicale e passione per la musica in tutte le sue forme. Se senti la musica mentre giochi, sei dei nostri. 🎵',
      descrizioneEstesa: "Sound & Play e il punto d'incontro tra gaming e musica. Qui parliamo di soundtrack di videogiochi, condividiamo playlist per giocare, discutiamo di produzione musicale e scopriamo nuovi artisti.\n\nLa nostra passione unisce due mondi: il gaming e la musica. Dal synthwave agli anni 80 alle orchestrali di Final Fantasy, dalla trap alle colonne sonore di Cyberpunk.\n\nOrganizziamo jam session virtuali, discussioni su come la musica influenza l'esperienza di gioco, e collaborazioni tra membri musicisti.\n\nSe credi che una buona colonna sonora possa fare la differenza, questo e il tuo gruppo!",
      membri: 730,
      immagine: 'https://picsum.photos/seed/music/800/300',
      membri_lista: [
        { id: 2, nome: 'Giulia M.',     avatar: 'https://i.pravatar.cc/150?img=5',  ruolo: 'Admin' },
        { id: 1, nome: 'Alessandro R.', avatar: 'https://i.pravatar.cc/150?img=11', ruolo: 'Membro' },
        { id: 3, nome: 'Luca P.',       avatar: 'https://i.pravatar.cc/150?img=15', ruolo: 'Membro' },
      ],
    },
    {
      id: 7,
      nome: 'Tech & Dev',
      area: 'Tecnologia',
      descrizione: 'Sviluppatori, appassionati di hardware, indie dev e tech enthusiast. Parliamo di codice, AI, gadget e tutto cio che fa andare avanti il mondo digitale. 💻',
      descrizioneEstesa: "Tech & Dev riunisce sviluppatori, appassionati di tecnologia e innovatori italiani. Che tu sia un senior developer, uno studente di informatica, o semplicemente un appassionato di gadget, qui troverai la tua trib.\n\nParliamo di: sviluppo web e mobile, intelligenza artificiale e machine learning, cybersecurity, hardware e componenti, startup e innovazione tech.\n\nOrganizziamo hackathon virtuali, code review collettive, discussioni su best practices e workshop su nuove tecnologie. Il tutto in un ambiente collaborativo e welcoming!",
      membri: 980,
      immagine: 'https://picsum.photos/seed/tech/800/300',
      membri_lista: [
        { id: 1, nome: 'Alessandro R.', avatar: 'https://i.pravatar.cc/150?img=11', ruolo: 'Admin' },
        { id: 2, nome: 'Giulia M.',     avatar: 'https://i.pravatar.cc/150?img=5',  ruolo: 'Moderatore' },
      ],
    },
    {
      id: 8,
      nome: 'Otaku Italia',
      area: 'Anime & Manga',
      descrizione: 'Il gruppo per chi vive di anime, manga e cultura giapponese. Recensioni, consigli, cosplay, news dalle case di produzione e tanto hype condiviso. ⛩️',
      descrizioneEstesa: "Otaku Italia e la piu grande community italiana per gli amanti di anime, manga e cultura giapponese. Qui discutiamo dei nuovi anime stagionali, consigliamo manga, condividiamo le nostre collezioni e parliamo di cosplay.\n\nCosa trovi nel gruppo:\n- Recensioni e opinioni su nuovi anime e manga\n- Consigli personalizzati basati sui tuoi gusti\n- News e anticipazioni dalle case di produzione\n- Eventi e convention in Italia (Comics, Lucca, etc.)\n- Showcase cosplay e tips per migliorare\n- Discussione su cultura giapponese: lingua, tradizioni, cibo\n\nChe tu sia un rewatcher di Naruto o un newbie che scopre Attack on Titan per la prima volta, troverai il tuo posto nella community!",
      membri: 1450,
      immagine: 'https://picsum.photos/seed/anime/800/300',
      membri_lista: [
        { id: 3, nome: 'Luca P.',       avatar: 'https://i.pravatar.cc/150?img=15', ruolo: 'Admin' },
        { id: 1, nome: 'Alessandro R.', avatar: 'https://i.pravatar.cc/150?img=11', ruolo: 'Moderatore' },
        { id: 2, nome: 'Giulia M.',     avatar: 'https://i.pravatar.cc/150?img=5',  ruolo: 'Membro' },
      ],
    },
  ];

  // ── CROWDFUNDING ────────────────────────────────────────────────────────────
  // La percentuale di avanzamento si calcola con raggiunto / obiettivo * 100.
  // I componenti usano questa formula per alimentare il componente ProgressBar.

  campagne: CampagnaCrowdfunding[] = [
    {
      id: 1,
      titolo: 'Torneo Spring Legends 2025',
      descrizione: 'Organizziamo il più grande torneo gaming italiano! Premi esclusivi, streaming live e tanto divertimento per tutta la community.',
      obiettivo: 5000,
      raggiunto: 3750,   // 75% raggiunto
      autore: '@ale_gamer_pro',
      immagine: 'https://loremflickr.com/800/400/esport,gaming?lock=1',
      scadenza: '2025-04-30',
      ricompense: [
        { titolo: 'Supporter', descrizione: 'Il tuo nome nei crediti del torneo',         importoMinimo: 10,  immagine: 'https://loremflickr.com/200/200/gaming?lock=101' },
        { titolo: 'Campione',  descrizione: 'T-shirt esclusiva + nome nei crediti',        importoMinimo: 30,  immagine: 'https://loremflickr.com/200/200/tshirt,merchandise?lock=102' },
        { titolo: 'Leggenda',  descrizione: 'Accesso VIP + kit esclusivo + meet & greet', importoMinimo: 100, immagine: 'https://loremflickr.com/200/200/trophy,award?lock=103' },
      ],
    },
    {
      id: 2,
      titolo: 'Eco-Warriors: Insieme per il Pianeta',
      descrizione: 'Raccogliamo fondi per piantare 1000 alberi in collaborazione con associazioni ambientali locali.',
      obiettivo: 2000,
      raggiunto: 1800,   // 90% raggiunto
      autore: '@luca_sport',
      immagine: 'https://loremflickr.com/800/400/forest,ecology?lock=2',
      scadenza: '2025-05-15',
      ricompense: [
        { titolo: 'Verde',   descrizione: 'Certificato digitale di adozione albero', importoMinimo: 5,  immagine: 'https://loremflickr.com/200/200/tree,nature?lock=104' },
        { titolo: 'Foresta', descrizione: 'Targa personalizzata + certificato',      importoMinimo: 25, immagine: 'https://loremflickr.com/200/200/forest,green?lock=105' },
      ],
    },
    {
      id: 3,
      titolo: 'Viaggi Virtuali: Esplora con Noi',
      descrizione: 'Creiamo una serie di video documentari sui luoghi più belli d\'Italia visitati dalla nostra community.',
      obiettivo: 3000,
      raggiunto: 468,    // ~15% raggiunto
      autore: '@giulia_travels',
      immagine: 'https://loremflickr.com/800/400/italy,travel?lock=3',
      scadenza: '2025-06-01',
      ricompense: [
        { titolo: 'Spettatore',   descrizione: 'Accesso anticipato ai video',   importoMinimo: 15, immagine: 'https://loremflickr.com/200/200/camera,video?lock=106' },
        { titolo: 'Protagonista', descrizione: 'Comparsa nel documentario',     importoMinimo: 50, immagine: 'https://loremflickr.com/200/200/documentary,film?lock=107' },
      ],
    },
  ];

  // ── ARTICOLI ────────────────────────────────────────────────────────────────
  // Gli articoli con stato 'Bozza' o 'In Revisione' non hanno contenuto completo.
  // I componenti filtrano per stato === 'Pubblicato' prima di mostrarli.

  articoli: Articolo[] = [
    {
      id: 1,
      titolo: 'Challenge Gaming Marzo 2025',
      descrizione: 'Un recap delle sfide più epiche del mese, con highlight dei partecipanti più attivi della community.',
      contenuto: [
        'Marzo è stato un mese ricchissimo di sfide per la nostra community. Dal Torneo Spring Legends ai mini-contest settimanali, abbiamo visto oltre 300 giocatori sfidarsi con fair play e tanta passione. Il livello si alza ogni mese e questo ci rende enormemente orgogliosi.',
        'I tre partecipanti più attivi del mese — @ale_gamer_pro, @pixel_runner e @dark_mage99 — hanno totalizzato rispettivamente 12, 10 e 9 vittorie nelle sfide quotidiane. Un applauso anche a tutti i nuovi iscritti che si sono buttati in pista senza esitare. Ci vediamo ad aprile con nuove sfide ancora più avvincenti!',
      ],
      stato: 'Pubblicato',
      visualizzazioni: 1234,
      likes: 89,
      data: '15 Mar 2025',
      categoria: 'Giochi',
      immagine: 'https://loremflickr.com/400/200/gaming,controller?lock=11',
    },
    {
      id: 2,
      titolo: 'Eco-Warriors: Iniziativa Verde',
      // Nessun contenuto: è ancora una bozza
      stato: 'Bozza',
      visualizzazioni: 0,
      likes: 0,
      data: '14 Mar 2025',
      categoria: 'Ambiente',
      immagine: 'https://loremflickr.com/400/200/ecology,nature?lock=12',
    },
    {
      id: 3,
      titolo: 'Guida al Torneo Primavera',
      stato: 'In Revisione',
      visualizzazioni: 456,
      likes: 23,
      data: '12 Mar 2025',
      categoria: 'Giochi',
      immagine: 'https://loremflickr.com/400/200/esport,tournament?lock=13',
    },
    {
      id: 4,
      titolo: 'Viaggi Virtuali: Esplora con Noi',
      descrizione: 'Un viaggio digitale attraverso le meraviglie italiane, raccontato da chi le ha vissute davvero.',
      contenuto: [
        'La campagna "Viaggi Virtuali" è nata da un\'idea semplice: ogni membro della community sceglie un luogo italiano che ama e lo racconta in un breve video o post. Il risultato è una mappa vivente e autentica del Bel Paese, filtrata dagli occhi di chi ci vive o ci ha viaggiato.',
        'Finora abbiamo esplorato virtualmente le Cinque Terre, i Sassi di Matera, il centro storico di Palermo e le Dolomiti in inverno. Se vuoi partecipare, carica il tuo contributo nel gruppo "Viaggi" con l\'hashtag #ViaggioConShareSphere. La prossima tappa? La decidete voi con il sondaggio in community.',
      ],
      stato: 'Pubblicato',
      visualizzazioni: 892,
      likes: 156,
      data: '10 Mar 2025',
      categoria: 'Viaggi',
      immagine: 'https://loremflickr.com/400/200/italy,landscape?lock=14',
    },
    {
      id: 5,
      titolo: 'Come migliorare le tue soft skills attraverso il gaming',
      descrizione: 'Scopri come il gioco di squadra online sviluppa empatia, comunicazione e leadership nella vita reale.',
      contenuto: [
        'Molti pensano al gaming come a un\'attività solitaria, ma chi gioca online lo sa bene: coordinarsi con il tuo team in un raid, comunicare sotto pressione in un torneo o mediare un conflitto in gilda richiede competenze reali. Studi recenti confermano che i giocatori abituali sviluppano capacità di problem-solving, flessibilità cognitiva e resistenza allo stress superiori alla media.',
        'In ShareSphere abbiamo raccolto le testimonianze di decine di membri che hanno trasferito le skill acquisite online nel lavoro e nella vita quotidiana. Alessandro racconta di aver imparato la leadership gestendo la sua gilda. Giulia ha affinato la comunicazione sintetica coordinando raid notturni. Il gaming, se vissuto con consapevolezza, è una vera palestra per le competenze del futuro.',
      ],
      stato: 'Pubblicato',
      visualizzazioni: 2341,
      likes: 234,
      data: '08 Mar 2025',
      categoria: 'Giochi',
      immagine: 'https://loremflickr.com/400/200/gaming,teamwork?lock=15',
    },
    {
      id: 6,
      titolo: 'I migliori giochi cooperativi del 2025',
      descrizione: 'La nostra selezione dei titoli più collaborativi: dal co-op locale alle avventure online per tutta la crew.',
      contenuto: [
        'Il 2025 è l\'anno del co-op. Dopo anni dominati dai battle royale, i grandi publisher stanno riscoprendo il piacere di giocare insieme invece che l\'uno contro l\'altro. La nostra redazione ha testato decine di titoli e ha selezionato quelli che mettono davvero la cooperazione al centro: non solo meccaniche di supporto, ma storie che si raccontano solo se ci sei insieme.',
        'In cima alla classifica troviamo "Echoes of the Rift" (cooperativo narrativo per 2-4 giocatori), "Urban League" (gestione urbana in team fino a 8) e "Terra Nuova" (survival cooperativo con meccaniche sociali profonde). Tutti e tre sono disponibili su PC e console. Trovate le recensioni complete nel gruppo Giochi di ShareSphere.',
      ],
      stato: 'Pubblicato',
      visualizzazioni: 3102,
      likes: 287,
      data: '01 Mar 2025',
      categoria: 'Giochi',
      immagine: 'https://loremflickr.com/400/200/videogame,multiplayer?lock=16',
    },
    {
      id: 7,
      titolo: '5 mete low-cost per una vacanza da gamer',
      descrizione: 'Destinazioni europee con gaming bar, LAN party ed eventi tech. La guida per chi viaggia col joypad.',
      contenuto: [
        'Chi ha detto che una vacanza da gamer debba costare un capitale? Abbiamo mappato le 5 città europee più accessibili e più ricche di eventi tech e gaming nel 2025. Varsavia guida la classifica con oltre 20 gaming bar nel centro storico e il maggiore festival retrogaming d\'Europa ogni settembre. Lisbona, Bucarest, Atene e Cracovia completano la top 5.',
        'Per ogni città troverete nel gruppo Viaggi la mini-guida con i posti da non perdere, i gaming bar consigliati dai nostri membri, e le date degli eventi principali. Budget medio stimato: 4-6 giorni tutto incluso sotto i 600€ partendo dall\'Italia. Il joypad fa parte del bagaglio a mano.',
      ],
      stato: 'Pubblicato',
      visualizzazioni: 1876,
      likes: 143,
      data: '28 Feb 2025',
      categoria: 'Viaggi',
      immagine: 'https://loremflickr.com/400/200/travel,backpacking?lock=17',
    },
    {
      id: 8,
      titolo: 'Community & sport: la storia di LucaSport',
      descrizione: 'Come un moderatore ha trasformato la passione per la corsa in un gruppo di 200 persone che corrono insieme.',
      contenuto: [
        'Luca Pellegrini, in arte @luca_sport, è uno dei moderatori più amati di ShareSphere. Tutto è iniziato con un post nel gruppo Sport: "Chi viene a correre domenica mattina a Milano?". Si aspettava 3-4 risposte. Ne arrivarono 47. Da quel giorno non si è più fermato.',
        'Oggi il gruppo "Corriamo Insieme" conta oltre 200 membri attivi in 12 città italiane. Ogni weekend si organizzano uscite locali, condivise in diretta sul canale community. Luca non aveva mai pensato di diventare un organizzatore: "ShareSphere mi ha dato gli strumenti, la community ha fatto il resto." La prossima tappa è una corsa collettiva a Roma il 18 maggio. Iscriviti nel gruppo Sport.',
      ],
      stato: 'Pubblicato',
      visualizzazioni: 987,
      likes: 76,
      data: '25 Feb 2025',
      categoria: 'Sport',
      immagine: 'https://loremflickr.com/400/200/running,sport?lock=18',
    },
    {
      id: 9,
      titolo: 'Inclusione nel gaming: sfidare gli stereotipi',
      descrizione: 'Storie di chi ha trovato nella nostra community uno spazio sicuro e rispettoso, al di là dei pregiudizi.',
      contenuto: [
        'Il mondo del gaming ha ancora troppi spazi tossici. ShareSphere nasce proprio per essere il contrario: un luogo dove non conta il genere, l\'età, la provenienza o il livello di abilità. Questo articolo raccoglie sei storie reali di persone che hanno trovato qui un posto dove sentirsi davvero a casa.',
        'Sara, 34 anni, racconta di aver abbandonato altri forum dopo episodi di harassment sistematico. "Qui ho trovato persone che mi trattano da pari, non da eccezione." Marco, 58 anni, pensava di essere "troppo vecchio per il gaming online": oggi è uno dei moderatori più rispettati del gruppo Giochi. Queste storie ci ricordano perché vale la pena costruire community con cura. La moderazione non è censura: è rispetto.',
      ],
      stato: 'Pubblicato',
      visualizzazioni: 4210,
      likes: 401,
      data: '20 Feb 2025',
      categoria: 'Inclusione',
      immagine: 'https://loremflickr.com/400/200/diversity,community?lock=19',
    },
    {
      id: 10,
      titolo: 'Game Jam 2025: i progetti più creativi',
      descrizione: 'Trentadue team, 72 ore, un tema: "Connessioni". Ecco i giochi più originali nati dalla nostra game jam.',
      contenuto: [
        'La prima Game Jam ufficiale di ShareSphere ha superato ogni aspettativa. Trentadue team formati qui in community — persone che non si erano mai incontrate prima — hanno dato vita a giochi originali in sole 72 ore. Il tema era "Connessioni" e le interpretazioni sono state sorprendenti: dai giochi sulla solitudine urbana a simulatori di ecosistemi, passando per un platform sulla comunicazione non verbale.',
        'Il vincitore, "Thread" del team @pixel_collective, è un puzzle cooperativo in cui due giocatori devono completare il livello senza mai comunicare con parole. Tutti i giochi sono scaricabili gratuitamente su itch.io cercando #ShareSphereJam2025. La prossima jam è già in programma per ottobre: inizia a formare il tuo team nel gruppo Game Dev.',
      ],
      stato: 'Pubblicato',
      visualizzazioni: 1540,
      likes: 118,
      data: '15 Feb 2025',
      categoria: 'Giochi',
      immagine: 'https://loremflickr.com/400/200/programming,developer?lock=20',
    },
  ];

  // ── CHALLENGE ───────────────────────────────────────────────────────────────
  // attiva: false = challenge conclusa (scadenza passata).
  // I componenti filtrano con .filter(c => c.attiva) per mostrare solo quelle in corso.

  challenge: Challenge[] = [
    {
      id: 1,
      titolo: 'Torneo Spring Legends',
      descrizione: 'Partecipa e vinci premi esclusivi! Il torneo gaming più atteso della primavera. Sfidata amici e nuovi avversari in epiche battaglie online.',
      area: 'Giochi',
      premio: 'Kit gaming esclusivo + Badge "Spring Legend"',
      scadenza: '2025-04-30',
      partecipanti: 342,
      obiettivo: 500,
      attiva: true,
      immagine: 'https://loremflickr.com/800/400/esport,gaming?lock=21',
      regole: [
        'Iscriviti con il tuo account ShareSphere',
        'Partecipa ad almeno 3 partite nel periodo della challenge',
        'Condividi i risultati usando #SpringLegends',
        'Il vincitore sarà il giocatore con più punti accumulati',
      ],
      tag: ['#Gaming', '#Torneo', '#Primavera', '#Competizione'],
    },
    {
      id: 2,
      titolo: '1000 Alberi per il Pianeta',
      descrizione: 'Completa le sfide ambientali e contribuisci a piantare 1000 alberi in collaborazione con associazioni locali. Ogni azione conta.',
      area: 'Ambiente',
      premio: 'Badge "Eco Warrior" + Certificato verde',
      scadenza: '2025-05-15',
      partecipanti: 178,
      obiettivo: 300,
      attiva: true,
      immagine: 'https://loremflickr.com/800/400/forest,trees?lock=22',
      regole: [
        'Completa almeno una sfida ambientale a settimana',
        'Condividi foto delle tue azioni con #EcoWarrior',
        'Invita almeno 2 amici alla challenge',
        'Documenta il tuo impatto in un post sul blog',
      ],
      tag: ['#Ambiente', '#Sostenibilità', '#EcoWarrior', '#Verde'],
    },
    {
      id: 3,
      titolo: 'Sfida Fotografica: Italia in 30 scatti',
      descrizione: 'Condividi i tuoi scatti più belli dell\'Italia con la community. Ogni giorno un luogo diverso, ogni scatto una storia.',
      area: 'Viaggi',
      premio: 'Fotocamera digitale + Badge "Fotografo Pro"',
      scadenza: '2025-03-01',
      partecipanti: 95,
      obiettivo: 150,
      attiva: false,  // conclusa
      immagine: 'https://loremflickr.com/800/400/photography,italy?lock=23',
      regole: [
        'Carica almeno una foto al giorno per 30 giorni',
        'Le foto devono essere scattate in Italia',
        'Usa l\'hashtag #Italia30Scatti',
        'Vota le foto degli altri partecipanti',
      ],
      tag: ['#Fotografia', '#Italia', '#Viaggi', '#Arte'],
    },
    {
      id: 4,
      titolo: 'Maratona di Primavera',
      descrizione: 'Corri almeno 5km al giorno per 30 giorni e condividi i tuoi progressi. Sfida te stesso e ispira tutta la community!',
      area: 'Sport',
      premio: 'Badge "Atleta" + scarpe da running sponsor',
      scadenza: '2025-05-31',
      partecipanti: 210,
      obiettivo: 400,
      attiva: true,
      immagine: 'https://loremflickr.com/800/400/running,marathon?lock=24',
      regole: [
        'Registra almeno 5km di corsa ogni giorno',
        'Usa un\'app di tracking (Strava, Nike Run Club, ecc.)',
        'Condividi i risultati settimanali nel gruppo',
        'Incoraggia altri partecipanti nei commenti',
      ],
      tag: ['#Sport', '#Running', '#Salute', '#Maratona'],
    },
    {
      id: 5,
      titolo: 'Game Jam: Crea il tuo Indie Game',
      descrizione: 'Hai 72 ore per creare un videogioco dal tema "Connessioni". Sfida la tua creatività e conquista visibilità nella community!',
      area: 'Giochi',
      premio: '€500 cash + Featured su ShareSphere + Badge "Indie Dev"',
      scadenza: '2025-04-15',
      partecipanti: 127,
      obiettivo: 200,
      attiva: true,
      immagine: 'https://loremflickr.com/800/400/programming,computer?lock=25',
      regole: [
        'Tema obbligatorio: "Connessioni"',
        'Il gioco deve essere sviluppato nelle 72 ore della jam',
        'Puoi lavorare da solo o in team (max 4 persone)',
        'Carica il progetto su itch.io e condividi il link',
      ],
      tag: ['#GameDev', '#IndieGame', '#Creatività', '#GameJam'],
    },
    {
      id: 6,
      titolo: 'Recipe Battle: Cucina da Gamer',
      descrizione: 'Condividi la tua ricetta "da gamer": snack creativi e pasti veloci per le sessioni di gioco. Il piatto più votato dalla community vince!',
      area: 'Altro',
      premio: 'Set da cucina pro + Badge "Chef Gamer"',
      scadenza: '2025-04-20',
      partecipanti: 88,
      obiettivo: 150,
      attiva: true,
      immagine: 'https://picsum.photos/seed/food1/800/400',
      regole: [
        'Pubblica la ricetta con foto nel gruppo dedicato',
        'La ricetta deve essere preparabile in meno di 15 minuti',
        'Usa #RecipeBattle e tagga @ShareSphere',
        'Vota le ricette degli altri partecipanti',
      ],
      tag: ['#Cucina', '#Ricette', '#Gaming', '#Food'],
    },
    {
      id: 7,
      titolo: 'Digital Mentor: Insegna il Gaming',
      descrizione: 'Aiuta un anziano, un bambino o una persona diversamente abile a scoprire il mondo digitale e il gaming. Condividi la tua esperienza.',
      area: 'Inclusione',
      premio: 'Badge "Digital Mentor" + Donazione a scelta',
      scadenza: '2025-06-30',
      partecipanti: 64,
      obiettivo: 200,
      attiva: true,
      immagine: 'https://picsum.photos/seed/include1/800/400',
      regole: [
        'Trova una persona a cui insegnare qualcosa di digitale',
        'Documenta il percorso con foto o video',
        'Condividi la storia nel blog di ShareSphere',
        'Usa #DigitalMentor',
      ],
      tag: ['#Inclusione', '#Digitale', '#Comunità', '#Aiuto'],
    },
    {
      id: 8,
      titolo: 'Viaggio in 60 Secondi',
      descrizione: 'Crea un video di 60 secondi che racconta un luogo che ami. Musica, voce o silenzio: l\'importante è emozionare la community.',
      area: 'Viaggi',
      premio: 'Weekend in agriturismo + Badge "Storyteller"',
      scadenza: '2025-03-20',
      partecipanti: 143,
      obiettivo: 200,
      attiva: false,  // conclusa
      immagine: 'https://picsum.photos/seed/video1/800/400',
      regole: [
        'Il video deve durare esattamente 60 secondi',
        'Carica su YouTube o TikTok con #Viaggio60s',
        'Il luogo deve essere reale e visitato da te',
        'Vota i video più emozionanti',
      ],
      tag: ['#Viaggi', '#Video', '#Storytelling', '#Luoghi'],
    },
    {
      id: 9,
      titolo: 'Torneo di Scacchi Online',
      descrizione: 'La sfida per i veri strateghi! Torneo eliminatorio su Chess.com aperto a tutti i livelli. Le partite finali saranno commentate in live su Twitch.',
      area: 'Giochi',
      premio: 'Badge "Grand Master" + set di scacchi artigianali',
      scadenza: '2025-02-28',
      partecipanti: 76,
      obiettivo: 128,
      attiva: false,  // conclusa
      immagine: 'https://picsum.photos/seed/chess1/800/400',
      regole: [
        'Registrati su Chess.com con username riconoscibile',
        'Partecipa a tutte le partite del tuo girone',
        'Rispetta il codice di fair play della community',
        'Commenta le partite degli altri nel forum',
      ],
      tag: ['#Scacchi', '#Strategia', '#Torneo', '#Chess'],
    },
    {
      id: 10,
      titolo: 'Urban Athlete: Sport in Città',
      descrizione: 'Scopri e condividi spot urbani per fare sport: parchi, skatepark, campetti. Insieme creiamo la mappa della tua città attiva!',
      area: 'Sport',
      premio: 'Abbonamento palestra 6 mesi + Badge "Urban Athlete"',
      scadenza: '2025-02-15',
      partecipanti: 201,
      obiettivo: 300,
      attiva: false,  // conclusa
      immagine: 'https://picsum.photos/seed/urban1/800/400',
      regole: [
        'Geolocalizza almeno 3 spot sportivi nella tua città',
        'Scatta una foto e descrivi l\'attività possibile',
        'Usa #UrbanAthlete e tagga la città',
        'Vota gli spot più belli degli altri',
      ],
      tag: ['#Sport', '#Città', '#Outdoor', '#Urban'],
    },
  ];

  // ── STATISTICHE ADMIN ───────────────────────────────────────────────────────
  // Oggetto piatto (non un array) con le metriche della dashboard admin.
  // I Delta sono stringhe già formattate per la visualizzazione (es. '+12%').

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
  // Array usato da tutti i componenti per ottenere colore e icona di ogni area.
  // I metodi getAreaColore() e getAreaIcona() nei componenti fanno .find() su questo array.

  areeTematiche = [
    { nome: 'Giochi',        icona: '🎮', colore: '#6c3ff5' },
    { nome: 'Sport',         icona: '⚽', colore: '#e74c3c' },
    { nome: 'Viaggi',        icona: '✈️', colore: '#3498db' },
    { nome: 'Inclusione',    icona: '❤️', colore: '#e91e8c' },
    { nome: 'Ambiente',      icona: '🌿', colore: '#2ecc71' },
    { nome: 'Musica',        icona: '🎵', colore: '#e67e22' },
    { nome: 'Tecnologia',    icona: '💻', colore: '#1abc9c' },
    { nome: 'Anime & Manga', icona: '⛩️', colore: '#c0392b' },
    { nome: 'Altro',         icona: '💬', colore: '#f39c12' },
  ];

  // ── METODI DI RICERCA ───────────────────────────────────────────────────────
  // Metodi helper che cercano un elemento per id nell'array corrispondente.
  // Restituiscono l'elemento trovato oppure undefined se non esiste.

  /** Cerca un utente per id. Restituisce undefined se non trovato. */
  getUtente(id: number) {
    return this.utenti.find(u => u.id === id);
  }

  /** Cerca un gruppo per id. Restituisce undefined se non trovato. */
  getGruppo(id: number) {
    return this.gruppi.find(g => g.id === id);
  }

  /** Cerca una campagna crowdfunding per id. Restituisce undefined se non trovata. */
  getCampagna(id: number) {
    return this.campagne.find(c => c.id === id);
  }
}