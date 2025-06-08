# 🐳 `docker-compose.yml` – Guida Tecnica

Il file `docker-compose.yml` serve per **orchestrare più container Docker** e facilitarne l’avvio con un singolo comando.

In questo progetto, `docker-compose` gestisce due servizi:

* **Frontend**: l'applicazione **Next.js** esposta sulla porta 3000.
* **Backend**: il server **FastAPI** esposto sulla porta 8000.

---

## 🧱 Struttura del file

### ✅ Servizi

```yaml
services:
  frontend:
    build: ./frontend
    container_name: frontend
    ports:
      - "3000:3000"
    restart: unless-stopped
    networks:
      - aletheialab-it
    command: [ "npm", "start" ]

  backend:
    build: ./backend
    container_name: backend
    ports:
      - "8000:8000"
    restart: unless-stopped
    networks:
      - aletheialab-it
    command: [ "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers" ]
```

---

### 🔍 Spiegazione dettagliata

| Chiave              | Descrizione                                                                           |
| ------------------- | ------------------------------------------------------------------------------------- |
| `frontend`          | Definisce il container per il frontend (Next.js)                                      |
| `build: ./frontend` | Costruisce l'immagine Docker per il frontend dalla cartella `frontend`                |
| `container_name`    | Nome del container nel sistema Docker                                                 |
| `ports`             | Mappa la porta `3000` interna del container sulla `3000` del tuo host                 |
| `restart`           | `unless-stopped` fa sì che il container si riavvii automaticamente se si blocca       |
| `networks`          | Associa il container alla rete Docker personalizzata (`aletheialab-it`)               |
| `command`           | Comando da eseguire per avviare il servizio (avvia il server Next.js con `npm start`) |                                                                         |
| ------------------- | ------------------------------------------------------------------------------------- |
| `backend`           | Definisce il container per il backend (FastAPI)                                       |
| `build: ./backend`  | Costruisce l'immagine Docker per il backend dalla cartella `backend`                  |
| `container_name`    | Nome del container nel sistema Docker                                                 |
| `ports`             | Mappa la porta `8000` interna del container sulla `8000` del tuo host                 |
| `command`           | Comando da eseguire per avviare il servizio (avvia il server FastAPI con `uvicorn`)   |

---

## 🌐 Reti (Networks)

```yaml
networks:
  aletheialab-it:
    name: aletheialab-it
    driver: bridge
```

📌 **Cosa fa questa rete?**

* Crea una rete virtuale chiamata `aletheialab-it`
* Utilizza il driver `bridge` (predefinito) per far comunicare i container tra loro, come in questo caso tra backend e frontend

---

## ▶️ Come avviare il progetto

Apri il terminale nella cartella del progetto e usa:

```bash
docker compose up -d --build
```

✅ Questo comando:

* Costruisce le immagini Docker se non esistono
* Avvia i container per il frontend e il backend
* Espone il frontend su [http://localhost:3000](http://localhost:3000) e il backend su [http://localhost:8000](http://localhost:8000)

---

## ⏹️ Come fermare tutto

```bash
docker compose down
```

Questo comando:

* Ferma tutti i container
* Rimuove la rete Docker associata
* Libera le porte

---

Di seguito il file `docker compose.yml`:

**[docker-compose.yml](../docker-compose.yml)** – Come viene costruita l'immagine Docker.

---

## 🛠️ Esempi di personalizzazione

### Cambiare porta pubblica

Vuoi usare la porta 3000 per il backend invece di 8000? Modifica così:

```yaml
backend:
  ports:
    - "3000:3000"
```

### Avvio in background (modalità detached)

```bash
docker compose up -d
```

---

## 📚 Risorse utili

* 📖 [Documentazione Docker Compose](https://docs.docker.com/compose/)
* 🧰 [Docker CLI cheatsheet](https://dockerlabs.collabnix.com/docker/cheatsheet/)
