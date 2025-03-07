# Używamy oficjalnego obrazu Node.js jako obrazu bazowego
FROM node:18-alpine

# Ustawiamy katalog roboczy wewnątrz kontenera
WORKDIR /app

# Kopiujemy plik package.json i package-lock.json (jeśli istnieje)
COPY package*.json ./

# Instalujemy zależności
RUN npm install --production

# Kopiujemy resztę kodu aplikacji
COPY . .

# Eksponujemy port, na którym działa aplikacja
EXPOSE 6713

# Definiujemy komendę startową
CMD ["node", "index.js"]
