# Stage de build
FROM node:20-alpine AS builder
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
RUN npm ci

# Copier le code source
COPY . .

# Build l'application
RUN npm run build

# Stage de production
FROM node:20-alpine
WORKDIR /app

# Copier package.json et installer uniquement les dépendances de production
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copier le code compilé depuis le stage builder
COPY --from=builder /app/dist ./dist

# Exposer le port
EXPOSE 3001

# Commande de démarrage
CMD ["node", "dist/main.js"]