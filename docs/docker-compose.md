---
# 🐳 `docker-compose.yml` – Guida Tecnica

Il file `docker-compose.yml` serve per **orchestrare più container Docker** e facilitarne l’avvio con un singolo comando.

In questo progetto, `docker-compose` gestisce l'applicazione Next.js esposta sulla porta 8080.

---

## 🧱 Struttura del file

### ✅ Servizi

```yaml
services:
  aletheialab:
    build: .
    container_name: aletheialab
    ports:
      - "8080:3000"
    restart: always
    networks:
      - aletheialab-it
```

### 🔍 Spiegazione dettagliata

| Chiave           | Descrizione                                                                  |
| ---------------- | ---------------------------------------------------------------------------- |
| `build: .`       | Docker costruisce l'immagine usando il `Dockerfile` nella directory corrente |
| `container_name` | Nome del container nel sistema Docker                                        |
| `ports`          | Mappa la porta `3000` interna del container sulla `8080` del tuo host        |
| `restart`        | `always` fa sì che il container si riavvii automaticamente se si blocca      |
| `networks`       | Associa il container a una rete Docker personalizzata (`aletheialab-it`)     |

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
* Utilizza il driver `bridge` (predefinito) per far comunicare i container tra loro
* È utile se in futuro vorrai aggiungere servizi esterni (es: un database)

---

## ▶️ Come avviare il progetto

Apri il terminale nella cartella del progetto e usa:

```bash
docker-compose up --build
```

✅ Questo comando:

* Costruisce l'immagine Docker se non esiste
* Avvia il container con la tua app Next.js
* Espone l’app su [http://localhost:8080](http://localhost:8080)

---

## ⏹️ Come fermare tutto

```bash
docker-compose down
```

Questo comando:

* Ferma tutti i container
* Rimuove la rete Docker associata
* Libera le porte

---

Di seguito il file `Docker-compose`:

**[docker-compose.yml](../docker-compose.yml)** – Come viene costruita l'immagine Docker.

---
## 🛠️ Esempi di personalizzazione

### Cambiare porta pubblica

Vuoi usare la porta 3000 invece di 8080? Modifica così:

```yaml
ports:
  - "3000:3000"
```

### Avvio in background (modalità detached)

```bash
docker-compose up -d
```

---

## 📚 Risorse utili

* 📖 [Documentazione Docker Compose](https://docs.docker.com/compose/)
* 🧰 [Docker CLI cheatsheet](https://dockerlabs.collabnix.com/docker/cheatsheet/)

---
