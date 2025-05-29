# 🌐 Sito Web Ufficiale di Aletheia

Benvenuto nel repository ufficiale del sito web di **Aletheia**

È costruito con:

* [Next.js](https://nextjs.org/) – framework React per lo sviluppo di applicazioni web moderne.
* [Docker](https://www.docker.com/) – per creare ambienti di sviluppo isolati e replicabili.
* [Node.js](https://nodejs.org/) – runtime per eseguire JavaScript lato server.
* [GitHub Actions](https://github.com/features/actions) – per automatizzare test, build e deploy.

---

## ✅ Requisiti di base

Per seguire questo progetto sul tuo computer, assicurati di avere installato i seguenti strumenti:

* 🐳 **Docker** – serve a "contenere" l'applicazione in un ambiente isolato.
* 🧩 **Docker Compose** – per avviare più servizi con un solo comando.
* 🟢 **Node.js** – necessario per installare dipendenze e avviare lo sviluppo locale.
* 🧬 **Git** – per clonare il progetto e contribuire al codice.

> 🔍 Suggerimento: se stai usando **Docker Desktop**, Docker Compose è già incluso!

---

## 🚀 Come iniziare passo per passo

### 1️⃣ Clona il progetto

Apri il terminale e digita:

```bash
git clone https://github.com/Aletheia-Sartup/aletheialab.it.git
```
selezionando la cartella di destinazione

### 2️⃣ Apri il progetto nel tuo editor preferito

Ad esempio [Visual Studio Code](https://code.visualstudio.com/) o [IntelliJ](https://www.jetbrains.com/idea/).

---

## 🐳 Avviare il progetto con Docker Compose

Docker Compose ti permette di avviare il sito con un singolo comando. È come avere un "ambiente pronto all’uso", senza dover installare manualmente ogni dipendenza.

```bash
docker-compose up --build
```

Poi apri il browser e vai su:

```
http://localhost:3000
```

> ⛔ Vuoi spegnere tutto? Usa:
>
> ```bash
> docker-compose down
> ```

---

## 🔁 Automazioni con GitHub Actions

Questo progetto usa **GitHub Actions** per automatizzare il flusso di lavoro (workflow) ogni volta che viene inviato codice al branch `main`.

Il file si trova qui:
`.github/workflows/deploy.yml`

Cosa fa:

* 🔧 Compila (build) l'applicazione
* 🚀 La pubblica (deploy) in produzione

> ✨ Questo rende il progetto sempre aggiornato automaticamente!
---

## 🧑‍💻 Avvio locale (senza Docker)

Se vuoi eseguire il progetto *manualmente* senza Docker (ad esempio per modifiche rapide), segui questi passaggi:

```bash
npm install
npm run dev
```

Oppure:

```bash
# con yarn
yarn install
yarn dev

# con pnpm
pnpm install
pnpm dev

# con bun
bun install
bun dev
```

Una volta avviato, apri il browser su `http://localhost:3000`

---

## 🛠️ Come personalizzare il progetto

Vuoi adattare il sito alle tue esigenze? Ecco da dove partire:

1. Esplora la cartella `app/` per vedere le pagine e i componenti principali.
2. Puoi modificare file `.jsx` o `.ts` per cambiare contenuti o stili.
3. Se aggiungi nuove librerie, ricorda di eseguire nuovamente i seguenti comandi:

   ```bash
   docker-compose build
   docker-compose up
   ```

---

## 🗂️ Struttura del progetto

```text
aletheialab.it/
├── docker-compose.yml       # Configurazione servizi Docker
├── Dockerfile               # Configurazione servizi Docker
├── .github/                 # Workflow GitHub Actions
│   └── workflows/
│       └── deploy.yml
├── app/                     # Pagine e routing Next.js
├── components/              # Componenti riutilizzabili
├── public/                  # File statici (immagini, icone, ecc.)
├── hooks/                   # Funzioni personalizzate di React
├── package.json             # Dipendenze e script
└── ...
```

---

## 📘 Approfondimenti tecnici

Abbiamo preparato guide dedicate per aiutarti a comprendere ogni parte tecnica del progetto:

* 🔧 **[Dockerfile.md](docs/Dockerfile.md)** – Come viene costruita l'immagine Docker e perché.
* 🧩 **[docker-compose.md](docs/docker-compose.md)** – Spiegazione dei servizi definiti e come interagiscono.
* 🔁 **[github-actions.md](docs/github-actions.md)** – Come funziona il flusso CI/CD automatizzato.

Trovi questi file nella cartella [`docs/`](docs/).
