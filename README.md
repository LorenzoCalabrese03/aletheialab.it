# 🌐 Sito Web Ufficiale di Aletheia

Benvenuto nel repository ufficiale del sito web di **Aletheia**.

Questo progetto è costruito con:

* [Next.js](https://nextjs.org/) – Framework React per lo sviluppo di applicazioni web moderne.
* [Docker](https://www.docker.com/) – Per creare ambienti di sviluppo isolati e replicabili.
* [Node.js](https://nodejs.org/) – Runtime per eseguire JavaScript lato server.
* [GitHub Actions](https://github.com/features/actions) – Per automatizzare test, build e deploy.

---

## ✅ Requisiti di base

Per seguire questo progetto sul tuo computer, assicurati di avere installato i seguenti strumenti:

* 🐳 **Docker** – Serve a "contenere" l'applicazione in un ambiente isolato.
* 🧩 **Docker Compose** – Per avviare più servizi con un solo comando.
* 🟢 **Node.js** – Necessario per installare dipendenze e avviare lo sviluppo locale.
* 🧬 **Git** – Per clonare il progetto e contribuire al codice.

> 🔍 Suggerimento: Se stai usando **Docker Desktop**, Docker Compose è già incluso!

> Per verificare se Docker è in esecuzione, digita:

```bash
docker ps
```

---

## 🚀 Come iniziare passo per passo

### 1️⃣ Clona il progetto

Se possiedi i permessi per clonare il repository, apri il terminale e digita:

```bash
git clone https://github.com/Aletheia-Sartup/aletheialab.it.git
```

Seleziona la cartella di destinazione.

> **Alternativa:** Scarica il file in formato ZIP.

### 2️⃣ Apri il progetto nel tuo editor preferito

Puoi utilizzare editor come [Visual Studio Code](https://code.visualstudio.com/) o [IntelliJ](https://www.jetbrains.com/idea/).

---

## 🐳 Avviare il progetto con Docker Compose

Docker Compose ti permette di avviare il sito con un singolo comando, creando un "ambiente pronto all'uso" senza la necessità di installare manualmente ogni dipendenza.

```bash
docker compose up --build
```

Attendi qualche secondo e poi apri il browser su:

```
http://localhost:3000
```

> ⛔ Vuoi spegnere tutto? Usa:

```bash
docker compose down
```

> **Nota:** Fai attenzione se ti viene chiesto di eseguire come amministratore.

---

## 🔁 Automazioni con GitHub Actions

Questo progetto usa **GitHub Actions** per automatizzare il flusso di lavoro ogni volta che viene inviato codice al branch `main`.

> In questo contesto, viene utilizzato per aggiornare automaticamente il server privato.

Il file del flusso di lavoro si trova qui:

```
.github/workflows/deploy.yml
```

Cosa fa:

* 🔧 Compila (build) l'applicazione.
* 🚀 La pubblica (deploy) in produzione.

> ✨ Questo rende il progetto sempre aggiornato automaticamente!

---

## 🧑‍💻 Avvio locale (senza Docker)

Se vuoi eseguire il progetto manualmente senza Docker (ad esempio per modifiche rapide), segui questi passaggi:

```bash
npm install
npm run dev
```

Oppure, se preferisci altri strumenti di gestione pacchetti:

```bash
# Con yarn
yarn install
yarn dev

# Con pnpm
pnpm install
pnpm dev

# Con bun
bun install
bun dev
```

Una volta avviato, apri il browser su `http://localhost:3000`.

---

## 🛠️ Come personalizzare il progetto

Vuoi adattare il sito alle tue esigenze? Ecco come iniziare:

1. Esplora la cartella `app/` per vedere le pagine e i componenti principali.
2. Modifica i file `.jsx` o `.ts` per cambiare contenuti o stili.
3. Se aggiungi nuove librerie, ricorda di eseguire nuovamente:

```bash
docker compose build
docker compose up
```

---

## 🗂️ Struttura del progetto

```text
aletheialab.it/
|── frontend
│      ├── Dockerfile                  # Configurazione dei servizi Docker per il frontend         
│      ├── app/                        # Pagine e routing Next.js
│      ├── components/                 # Componenti riutilizzabili
│      ├── public/                     # File statici (immagini, icone, ecc.)
│      ├── hooks/                      # Funzioni personalizzate di React
│      ├── package.json                # Dipendenze e script
│      └── ...
|── backend
│      ├── data/                       # Cartella con i file JSON da fetchare
│      ├── Dockerfile                  # Configurazione dei servizi Docker per il backend
│      ├── main.py                     # Logica di backend per fetchare i file da dati
│      └── requirements.txt            # Requirements necessari all'avvio
|
├── docker-compose.yml                # Configurazione dei servizi Docker
├── .github/                          # Workflow GitHub Actions
│   └── workflows/
│       └── deploy.yml
```

---

## 📘 Approfondimenti tecnici

Abbiamo preparato delle guide per aiutarti a comprendere ogni parte tecnica del progetto:

* 🔧 **[Dockerfile.md](docs/Dockerfile.md)** – Come viene costruita l'immagine Docker e perché.
* 🧩 **[docker-compose.md](docs/docker-compose.md)** – Spiegazione dei servizi definiti e come interagiscono.
* 🔁 **[github-actions.md](docs/github-actions.md)** – Come funziona il flusso CI/CD automatizzato.

Trovi questi file nella cartella [`docs/`](docs/).

---

