# 📦 Dockerfile – Guida Tecnica

Il file `Dockerfile` permette di creare un'immagine Docker ottimizzata per eseguire l'applicazione **Next.js** in produzione e per gestire il backend con **FastAPI**.

👉 È suddiviso in **due fasi principali** (multi-stage build) per il frontend e in un'ulteriore fase per il backend:

1. **Build (Frontend)**: compila l'app di Next.js e genera gli asset finali.
2. **Produzione (Frontend)**: esegue l'app Next.js in modalità produzione.
3. **Backend**: crea l'immagine per il backend FastAPI.

---

## 🧱 Struttura del Dockerfile

---

### 🔨 Fase 1 – Build (Frontend)

```dockerfile
FROM node:23-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
```

📌 **Spiegazione:**

* `node:23-alpine`: immagine leggera basata su Alpine Linux.
* `WORKDIR /app`: imposta la cartella di lavoro.
* `COPY . .`: copia tutti i file nel container.
* `npm install`: installa le dipendenze.
* `npm run build`: compila il progetto Next.js.

🎯 **Scopo della fase build:**

* Installare tutte le dipendenze (anche di sviluppo).
* Generare i file ottimizzati (`.next/`).
* Preparare l'app per la produzione.

---

### 🚀 Fase 2 – Produzione (Frontend)

```dockerfile
FROM node:23-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
```

📌 **Spiegazione:**

* Usa un container "pulito", separato dalla fase di build.
* Imposta la variabile `NODE_ENV` su `production`.

```dockerfile
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app ./
```

📦 **File copiati:**

* `public/`: file statici (immagini, favicon, ecc.)
* `.next/`: l'app già compilata.
* `package.json`, `node_modules`: per avviare il server.
* Tutti gli altri file necessari.

```dockerfile
EXPOSE 3000
CMD ["npm", "start"]
```

* `EXPOSE 3000`: espone la porta dell’app.
* `CMD`: avvia l’app in modalità produzione con `npm start`.

---

### 🐍 Backend Dockerfile (FastAPI)

```dockerfile
# Usa l'immagine ufficiale di Python come base
FROM python:3.13-slim

# Aggiorna pip alla versione più recente
RUN python -m pip install --upgrade pip

# Imposta il working directory all'interno del contenitore
WORKDIR /backend

# Copia i file di dipendenze nel contenitore
COPY requirements.txt .

# Aggiorna tutte le librerie alla versione più recente e installa quelle elencate in requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copia il codice sorgente nel contenitore
COPY . .

# Espone la porta su cui FastAPI gira
EXPOSE 8000

# Comando per avviare il server di FastAPI
CMD ["uvicorn", "app.main:app", "127.0.0.1", "--port", "8000"]
```

📌 **Spiegazione:**

* `FROM python:3.13-slim`: usa un'immagine leggera di Python 3.13 basata su Debian slim.
* `RUN python -m pip install --upgrade pip`: aggiorna `pip` alla versione più recente.
* `WORKDIR /backend`: imposta la cartella di lavoro all'interno del contenitore.
* `COPY requirements.txt .`: copia il file `requirements.txt` nel contenitore per l'installazione delle dipendenze.
* `RUN pip install --no-cache-dir --upgrade -r requirements.txt`: installa le dipendenze Python necessarie per FastAPI.
* `COPY . .`: copia il codice sorgente dell'applicazione nel contenitore.
* `EXPOSE 8000`: espone la porta 8000, la porta predefinita su cui FastAPI è in esecuzione.
* `CMD ["uvicorn", "app.main:app", "127.0.0.1", "--port", "8000"]`: avvia il server FastAPI usando `uvicorn`.

🎯 **Scopo del Dockerfile del backend:**

* Fornire un ambiente di esecuzione isolato per il backend basato su FastAPI.
* Installare tutte le dipendenze necessarie per il funzionamento di FastAPI.
* Avviare il server di FastAPI sulla porta 8000.

---

## 🛠️ Personalizzazioni comuni

Se desideri apportare delle modifiche al file, queste sono le più comuni:

### Cambiare versione di Node.js (Frontend)

```dockerfile
FROM node:20-alpine AS build
```

### Cambiare versione di Python (Backend)

Se desideri cambiare la versione di Python, puoi farlo modificando la base dell'immagine:

```dockerfile
FROM python:3.10-slim
```

### Aggiungere dipendenze Python (Backend)

Per aggiungere librerie o pacchetti di sistema nel backend, puoi usare il comando `RUN`:

```dockerfile
RUN apt-get update && apt-get install -y libpq-dev
```

---

## 📚 Risorse utili

* 📘 [Guida Dockerfile (Ufficiale)](https://docs.docker.com/engine/reference/builder/)
* 🧱 [Multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/)
* 🐳 [Node.js su Docker Hub](https://hub.docker.com/_/node)
* 🐍 [FastAPI su Docker](https://fastapi.tiangolo.com/deployment/docker/)
* 📦 [Python su Docker Hub](https://hub.docker.com/_/python)
