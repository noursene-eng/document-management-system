# Backend - Document Management API

API NestJS pour la gestion de documents juridiques et financiers avec analyse IA.

Une fois le serveur démarré, la documentation Swagger est disponible sur :
http://localhost:3001/api

## 🏗️ Architecture

### Modules

- **DocumentsModule** : Gestion des documents (upload, traitement, extraction de texte)
- **StorageModule** : Service MinIO pour le stockage d'objets
- **AiAgentsModule** : Agents IA avec Groq pour l'analyse
- **ReportsModule** : Génération de rapports (synthèse, analyse concurrentielle, business plan)
- **WebSocketModule** : Notifications en temps réel
- ### Services Principaux

#### StorageService
- Upload de fichiers vers MinIO
- Génération d'URLs presignées
- Téléchargement et suppression de fichiers

#### DocumentsService
- Création et gestion de documents
- Traitement et extraction de texte (PDF, Word)
- Gestion des statuts (pending, processing, processed, error)

#### AiAgentsService
- Génération de synthèse globale
- Analyse concurrentielle
- Génération de business plan
- Support du streaming

#### ReportsService
- Création et gestion de rapports
- Génération asynchrone avec mise à jour des statuts
- Support du streaming
- # Frontend - Document Management Interface
- L'application sera accessible sur http://localhost:3000

## 🏗️ Structure

### Composants

- **DocumentUpload** : Interface d'upload de documents
- **DocumentList** : Liste des documents avec statuts
- **ReportGenerator** : Génération de rapports IA

### Pages

- **app/page.tsx** : Page principale avec toutes les fonctionnalités

### Utilitaires

- **lib/api.ts** : Client API pour communiquer avec le backend
