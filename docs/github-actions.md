# ⚙️ GitHub Actions – Deploy Automatizzato

Questo progetto utilizza **GitHub Actions** per eseguire un deploy **automatico** su un server personale (self-hosted) ogni volta che viene effettuato un `push` sul ramo `main`.

---

## 🧠 Cosa fa questo workflow?

Ogni volta che invii codice al ramo `main`:

1. GitHub si collega in modo sicuro al tuo server.
2. Esegue il deploy aggiornando il codice, ripulendo eventuali modifiche locali non committate e forzando il pull dell'ultima versione.
3. Ricostruisce i container Docker aggiornati.
4. Pulisce le risorse inutilizzate per risparmiare spazio.

---

## 🗂️ Struttura del file `deploy.yml`

```yaml
name: Deploy su Server Casalingo (Self-Hosted)
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

### ⚙️ Step di deploy dettagliati

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v4

  - name: Force clean local repository before pull
    run: |
      cd ~/evoluzione/aletheialab.it
      git reset --hard HEAD          # Scarta tutte le modifiche locali non committate
      git clean -fdx                 # Rimuove file e directory non tracciati (anche ignorati)

  - name: Pull latest code (via HTTPS + GitHub token)
    env:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    run: |
      cd ~/evoluzione/aletheialab.it
      git pull https://x-access-token:${GH_TOKEN}@github.com/LorenzoCalabrese03/aletheialab.it.git main

  - name: Rebuild containers
    run: |
      cd ~/evoluzione/aletheialab.it
      docker compose up -d --build

  - name: Pulisci spazio su disco (immagini e volumi inutilizzati)
    run: docker system prune -af --volumes

  - name: Deploy completed
    run: echo "Deploy completed on aletheialab server."
```

> Questo flusso garantisce che eventuali modifiche locali indesiderate vengano rimosse, evitando conflitti durante il pull.
> L'autenticazione avviene tramite il token GitHub (`GITHUB_TOKEN`), quindi non è più necessaria la configurazione di chiavi SSH per scaricare il codice.

---

## 🔐 Come impostare i Secret

### Per l’attuale workflow:

| Nome           | Contenuto                                                            |
| -------------- | -------------------------------------------------------------------- |
| `GITHUB_TOKEN` | Token GitHub predefinito (automaticamente fornito da GitHub Actions) |

> Non è più necessario impostare la chiave SSH privata per l'accesso Git, dato che il pull avviene via HTTPS con token.

---

## 🔄 Esecuzione Manuale

Puoi anche avviare il workflow manualmente da GitHub cliccando su:

📁 Repository → **Actions** → `Deploy su Server Casalingo` → **Run workflow**

---

## 📚 Risorse utili

* [Guida GitHub Actions](https://docs.github.com/en/actions)
* [Workflow syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
* [Self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners)

---
