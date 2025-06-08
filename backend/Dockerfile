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