# Stage de build
FROM node:20-alpine AS builder
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
RUN npm ci

# Copier le code source
COPY . .

# Build l'application Next.js
RUN npm run build

# Stage de production
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

# Copier package.json et installer uniquement les dépendances de production
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copier les fichiers buildés depuis le stage builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"]