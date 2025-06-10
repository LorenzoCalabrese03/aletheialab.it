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

## 🚦 Modalità di avvio disponibili

Sono state ideati tre modalità differetni per eseguire l'applicazione **Aletheia**, a seconda delle tue necessità:

1. **Con Docker Compose** – Per esecuzione locale in un ambiente isolato.
2. **Su Virtual Machine** – Per deploy e test automatici sfruttando le capacità di GitHub Actions.
3. **Manuale con Node.js** – Per sviluppo rapido o debugging.

---

## 🐳 1. Avvio con Docker Compose (ambiente locale)

Docker Compose ti permette di avviare il sito con un singolo comando da eseguire nella route del progetto:

```bash
docker compose up -d --build
```

Una volta completato, visita:

```
http://localhost:3000
```

Per fermare l’applicazione:

```bash
docker compose down
```

> **Nota:** Alcune operazioni potrebbero richiedere privilegi di amministratore.

---

## ⚙️ 2. Avvio su Virtual Machine (per praticare GitHub Actions)

Quando il codice viene inviato al branch `main`, GitHub Actions riceve un trigger che fa partire un workflow automaticamente, presente nel file di configurazione:

```
.github/workflows/deploy.yml
```

Se stai testando il progetto su una tua VM, puoi ottenere l'indirizzo IP della macchina con:

```bash
ip a
```

Poi visita:

```
http://[IP-DELLA-VM]:3000
```

> ✨ Questo processo garantisce che il sito sia sempre aggiornato automaticamente!

---

## 🧑‍💻 3. Avvio manuale (senza Docker)

Per eseguire il progetto localmente in modo manuale (utile per modifiche rapide), segui questi passaggi:

```bash
npm install
npm run dev
```

per avviare la build ed eseguirlo, digita:

```bash
npm run build
npm run start
```

Oppure, con un altro package manager:

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

Una volta avviato, visita:

```
http://localhost:3000
```

---

## 🛠️ Come personalizzare il progetto

Vuoi adattare il sito alle tue esigenze? Ecco come iniziare:

1. Esplora la cartella `app/` per vedere le pagine e i componenti principali.
2. Modifica i file `.jsx` o `.tsx` per cambiare contenuti o stili.
3. Se aggiungi nuove librerie, ricorda di eseguire:

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
