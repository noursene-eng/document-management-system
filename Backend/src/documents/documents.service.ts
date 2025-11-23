import { Injectable, Logger } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { DocumentParserService } from './document-parser.service';
import { v4 as uuidv4 } from 'uuid';

export enum DocumentType {
  LEGAL = 'legal',
  FINANCIAL = 'financial',
  OTHER = 'other',
}

export enum DocumentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  PROCESSED = 'processed',
  ERROR = 'error',
}

export interface Document {
  id: string;
  originalName: string;
  objectName: string;
  url: string;
  type: DocumentType;
  status: DocumentStatus;
  size: number;
  mimeType: string;
  extractedText?: string;
  uploadedAt: Date;
  processedAt?: Date;
  error?: string;
}

@Injectable()
export class DocumentsService {
  private readonly logger = new Logger(DocumentsService.name);
  private documents: Map<string, Document> = new Map();

  constructor(
    private readonly storageService: StorageService,
    private readonly documentParser: DocumentParserService,
  ) {}

  /**
   * Crée un nouveau document après upload
   */
  async createDocument(
    file: Express.Multer.File,
    type: DocumentType = DocumentType.OTHER,
  ): Promise<Document> {
    try {
      // Upload vers MinIO
      const uploadResult = await this.storageService.uploadFile(file, 'documents');

      const document: Document = {
        id: uuidv4(),
        originalName: file.originalname,
        objectName: uploadResult.objectName,
        url: uploadResult.url,
        type,
        status: DocumentStatus.PENDING,
        size: uploadResult.size,
        mimeType: file.mimetype,
        uploadedAt: new Date(),
      };

      this.documents.set(document.id, document);
      this.logger.log(`Document créé: ${document.id}`);

      return document;
    } catch (error) {
      this.logger.error(`Erreur lors de la création du document: ${error.message}`);
      throw error;
    }
  }

  /**
   * Traite un document (extraction du texte)
   */
  async processDocument(documentId: string): Promise<Document> {
    const document = this.documents.get(documentId);
    if (!document) {
      throw new Error(`Document non trouvé: ${documentId}`);
    }

    try {
      document.status = DocumentStatus.PROCESSING;
      this.documents.set(documentId, document);

      // Télécharger le fichier depuis MinIO
      const buffer = await this.storageService.downloadFile(document.objectName);

      // Extraire le texte
      const extractedText = await this.documentParser.parseDocument(buffer, document.mimeType);

      document.extractedText = extractedText;
      document.status = DocumentStatus.PROCESSED;
      document.processedAt = new Date();

      this.documents.set(documentId, document);
      this.logger.log(`Document traité: ${documentId}`);

      return document;
    } catch (error) {
      document.status = DocumentStatus.ERROR;
      document.error = error.message;
      this.documents.set(documentId, document);
      this.logger.error(`Erreur lors du traitement: ${error.message}`);
      throw error;
    }
  }

  /**
   * Récupère un document par son ID
   */
  getDocument(documentId: string): Document | undefined {
    return this.documents.get(documentId);
  }

  /**
   * Récupère tous les documents
   */
  getAllDocuments(): Document[] {
    return Array.from(this.documents.values());
  }

  /**
   * Supprime un document
   */
  async deleteDocument(documentId: string): Promise<void> {
    const document = this.documents.get(documentId);
    if (!document) {
      throw new Error(`Document non trouvé: ${documentId}`);
    }

    await this.storageService.deleteFile(document.objectName);
    this.documents.delete(documentId);
    this.logger.log(`Document supprimé: ${documentId}`);
  }
}
