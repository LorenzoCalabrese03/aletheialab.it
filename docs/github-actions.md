# ⚙️ GitHub Actions – Deploy Automatizzato

Questo progetto utilizza **GitHub Actions** per eseguire un deploy **automatico** su un server personale (self-hosted) ogni volta che viene effettuato un `push` sul ramo `main`.

---

## 🧠 Cosa fa questo workflow?

Ogni volta che invii codice al ramo `main`:

1. GitHub si collega in modo sicuro al tuo server.
2. Esegue il deploy aggiornando il codice e ricostruendo i container Docker.
3. Pulisce le risorse inutilizzate per risparmiare spazio.

---

## 🗂️ Struttura del file `deploy.yml`

```yaml
name: Deploy su Server Personale (Self-Hosted)
```

> Nome visibile nel pannello Actions di GitHub.

---

### 🎯 Trigger del workflow

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
```

* `push`: si attiva ogni volta che fai `git push` su `main`.
* `workflow_dispatch`: permette di **eseguire manualmente** il workflow da GitHub.

---

### 🛠️ Job di deploy

```yaml
jobs:
  deploy:
    runs-on: self-hosted
```

> Specifica che il job deve essere eseguito su un **runner self-hosted** (il server in casa).

---

### 🔐 Step 1 – Configurazione SSH

```yaml
- name: Configura SSH per GitHub
  run: |
    mkdir -p ~/.ssh
    echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_ed25519
    chmod 600 ~/.ssh/id_ed25519
    ...
```

> Crea una chiave SSH temporanea sul server, usando una chiave privata salvata nei **GitHub Secrets**. Serve per **scaricare il codice da GitHub in modo sicuro**.

---

### ✅ Step 2 – Autorizzazione Git

```yaml
- name: Imposta la directory Git come sicura
  run: git config --global --add safe.directory /home/aletheialab/aletheialab-app
```

> Alcune versioni di Git richiedono di dichiarare esplicitamente la directory come “sicura” per evitare errori.

---

### 🚀 Step 3 – Deploy con Docker Compose

```yaml
- name: Esegui il deploy con Docker Compose
  run: |
    cd /home/aletheialab/aletheialab-app
    git fetch origin
    git reset --hard origin/main
    docker compose pull
    docker compose up -d --build
```

> Scarica l'ultima versione del codice e ricostruisce l’immagine con Docker.

* `pull`: scarica eventuali immagini aggiornate.
* `up -d --build`: ricrea i container aggiornati in background.

---

### 🧹 Step 4 – Pulizia

```yaml
- name: Pulisci spazio su disco
  run: docker system prune -af --volumes
```

> Elimina immagini Docker, container e volumi non più utilizzati per **liberare spazio**.

---

Di seguito il file `github-actions.yml`:

**[github-actions.yml](../github-actions.yml)** – Come viene gestito il github-actions.

---


## 🔐 Come impostare i Secret

Vai su **Settings → Secrets → Actions** nel tuo repo e crea:

| Nome              | Contenuto                                      |
| ----------------- | ---------------------------------------------- |
| `SSH_PRIVATE_KEY` | La tua chiave privata (usata per clonare repo) |

> ⚠️ **Non condividere mai** la chiave privata con nessuno.

---

## 🔄 Esecuzione Manuale

Puoi anche avviare il workflow manualmente da GitHub cliccando su:

📁 Repository → **Actions** → `Deploy su Server Personale` → **Run workflow**

---

## 📚 Risorse utili

* [Guida GitHub Actions](https://docs.github.com/en/actions)
* [Workflow syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
* [Self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners)

---

Vuoi che ti aiuti anche a redigere una guida **per configurare un runner self-hosted** da zero sul tuo server?
