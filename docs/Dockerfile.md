# 📦 Dockerfile – Guida Tecnica

Il file `Dockerfile` permette di creare un'immagine Docker ottimizzata per eseguire l'applicazione **Next.js** in produzione.

👉 È suddiviso in **due fasi principali** (multi-stage build):

1. **Build**: compila l'app e genera gli asset finali.
2. **Produzione**: esegue solo il necessario, in modo leggero e sicuro.

---

## 🧱 Struttura del Dockerfile

---

### 🔨 Fase 1 – Build

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

### 🚀 Fase 2 – Produzione

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

## 🛠️ Personalizzazioni comuni

Se si desidera apportare delle modifiche al file, queste sono le più comuni:

### Cambiare versione di Node.js

```dockerfile
FROM node:20-alpine AS build
```

### Aggiungere pacchetti di sistema (es. `sharp`)

```dockerfile
RUN apk add --no-cache libc6-compat
```

---

## 📚 Risorse utili

* 📘 [Guida Dockerfile (Ufficiale)](https://docs.docker.com/engine/reference/builder/)
* 🧱 [Multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/)
* 🐳 [Node.js su Docker Hub](https://hub.docker.com/_/node)
