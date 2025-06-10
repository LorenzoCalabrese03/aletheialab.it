# 📦 Dockerfile – Guida Tecnica

Il file `Dockerfile` consente di creare un'immagine Docker ottimizzata per eseguire l'applicazione **Next.js** in produzione e per gestire il backend con **FastAPI**.

👉 Strutturato in **due sezioni principali**:

1. **Frontend (Next.js)** – con una singola fase che esegue build e run.
2. **Backend (FastAPI)** – dedicata alla creazione del backend Python.

---

## 🧱 Struttura del Dockerfile

---

### 🚀 Frontend (Next.js) – Singola fase

```dockerfile
FROM node:23-alpine AS build

WORKDIR /app

COPY ./package.json .
RUN npm install

COPY . .
ENV NODE_ENV=production
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

📌 **Spiegazione:**

* `FROM node:23-alpine`: utilizza un'immagine leggera basata su Alpine con Node 23.
* `WORKDIR /app`: definisce la directory di lavoro.
* `COPY ./package.json .` e `RUN npm install`: installano solo le dipendenze dichiarate.
* `COPY . .`: copia tutto il resto del codice nel container.
* `ENV NODE_ENV=production`: definisce l'ambiente come produzione.
* `RUN npm run build`: compila l'app Next.js.
* `EXPOSE 3000`: espone la porta su cui gira l’applicazione.
* `CMD ["npm", "start"]`: avvia l’applicazione.

🎯 **Nota**: questa nuova configurazione è più compatta e unisce le fasi di build e run, utile per semplificare il processo in ambienti dove lo spazio o il tempo di build non sono una priorità.

---

### 🐍 Backend (FastAPI)

```dockerfile
FROM python:3.13-slim

RUN python -m pip install --upgrade pip

WORKDIR /backend

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "127.0.0.1", "--port", "8000"]
```

📌 **Spiegazione**: (identica alla versione precedente)

* Ambiente leggero per Python 3.13.
* Installa le dipendenze necessarie da `requirements.txt`.
* Avvia il server FastAPI con `uvicorn`.

---

## 🛠️ Personalizzazioni comuni

### Cambiare versione di Node.js

```dockerfile
FROM node:20-alpine
```

### Cambiare versione di Python

```dockerfile
FROM python:3.10-slim
```

### Aggiungere dipendenze di sistema (es. PostgreSQL)

```dockerfile
RUN apt-get update && apt-get install -y libpq-dev
```

---

## 📚 Risorse utili

* 📘 [Dockerfile (Ufficiale)](https://docs.docker.com/engine/reference/builder/)
* 🧱 [Multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/)
* 🐳 [Node.js su Docker Hub](https://hub.docker.com/_/node)
* 🐍 [FastAPI su Docker](https://fastapi.tiangolo.com/deployment/docker/)
* 📦 [Python su Docker Hub](https://hub.docker.com/_/python)
