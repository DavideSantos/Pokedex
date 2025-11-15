# Usa un'immagine ufficiale Node come base
FROM node:18-alpine

# Imposta la directory di lavoro nell'immagine Docker
WORKDIR /app

# Copia il file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice sorgente nell'immagine
COPY . .

# Compila l'applicazione React per la produzione
RUN npm run build

# Serve l'applicazione con un server statico (come serve)
RUN npm install -g serve

# Esponi la porta su cui l'app gira
EXPOSE 3000

# Avvia il server statico per servire la tua applicazione React
CMD ["serve", "-s", "build", "-l", "3000"]
