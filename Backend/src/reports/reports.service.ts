import { Injectable, Logger } from '@nestjs/common';
import { DocumentsService } from '../documents/documents.service';
import { AiAgentsService, ReportType } from '../ai-agents/ai-agents.service';
import { WebSocketGateway } from '../websocket/websocket.gateway';
import { v4 as uuidv4 } from 'uuid';

export enum ReportStatus {
  READY = 'ready',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ERROR = 'error',
}

export interface Report {
  id: string;
  type: ReportType;
  status: ReportStatus;
  documentIds: string[];
  content?: string;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);
  private reports: Map<string, Report> = new Map();

  constructor(
    private readonly documentsService: DocumentsService,
    private readonly aiAgentsService: AiAgentsService,
    private readonly websocketGateway: WebSocketGateway,
  ) {}

  /**
   * Crée une nouvelle demande de rapport
   */
  async createReport(type: ReportType, documentIds: string[]): Promise<Report> {
    const report: Report = {
      id: uuidv4(),
      type,
      status: ReportStatus.READY,
      documentIds,
      createdAt: new Date(),
    };

    this.reports.set(report.id, report);
    this.logger.log(`Rapport créé: ${report.id} (type: ${type})`);

    // Notifier via WebSocket
    this.websocketGateway.emitReportUpdate(report);

    return report;
  }

  /**
   * Génère un rapport de manière asynchrone
   */
  async generateReport(reportId: string): Promise<Report> {
    const report = this.reports.get(reportId);
    if (!report) {
      throw new Error(`Rapport non trouvé: ${reportId}`);
    }

    try {
      // Mettre à jour le statut
      report.status = ReportStatus.IN_PROGRESS;
      this.reports.set(reportId, report);
      this.websocketGateway.emitReportUpdate(report);

      // Récupérer les documents
      if (!report.documentIds || report.documentIds.length === 0) {
        throw new Error('Aucun document spécifié pour ce rapport');
      }

      const documents = report.documentIds
        .map((id) => this.documentsService.getDocument(id))
        .filter((doc) => doc && doc.extractedText);

      if (documents.length === 0) {
        throw new Error('Aucun document traité trouvé');
      }

      // Extraire les textes
      const documentsText = documents.map((doc) => doc.extractedText!);

      // Générer le rapport avec l'agent IA
      this.logger.log(`Génération du rapport ${reportId}...`);
      const content = await this.aiAgentsService.generateReport(report.type, documentsText);

      // Mettre à jour le rapport
      report.content = content;
      report.status = ReportStatus.COMPLETED;
      report.completedAt = new Date();
      this.reports.set(reportId, report);

      // Notifier via WebSocket
      this.websocketGateway.emitReportUpdate(report);

      this.logger.log(`Rapport généré avec succès: ${reportId}`);
      return report;
    } catch (error) {
      report.status = ReportStatus.ERROR;
      report.error = error.message;
      this.reports.set(reportId, report);
      this.websocketGateway.emitReportUpdate(report);

      this.logger.error(`Erreur lors de la génération: ${error.message}`);
      throw error;
    }
  }

  /**
   * Génère un rapport en streaming
   */
  async *generateReportStream(reportId: string): AsyncGenerator<string, void, unknown> {
    const report = this.reports.get(reportId);
    if (!report) {
      throw new Error(`Rapport non trouvé: ${reportId}`);
    }

    try {
      report.status = ReportStatus.IN_PROGRESS;
      this.reports.set(reportId, report);
      this.websocketGateway.emitReportUpdate(report);

      const documents = report.documentIds
        .map((id) => this.documentsService.getDocument(id))
        .filter((doc) => doc && doc.extractedText);

      if (documents.length === 0) {
        throw new Error('Aucun document traité trouvé');
      }

      const documentsText = documents.map((doc) => doc.extractedText!);

      let fullContent = '';
      for await (const chunk of this.aiAgentsService.generateReportStream(
        report.type,
        documentsText,
      )) {
        fullContent += chunk;
        yield chunk;
      }

      report.content = fullContent;
      report.status = ReportStatus.COMPLETED;
      report.completedAt = new Date();
      this.reports.set(reportId, report);
      this.websocketGateway.emitReportUpdate(report);
    } catch (error) {
      report.status = ReportStatus.ERROR;
      report.error = error.message;
      this.reports.set(reportId, report);
      this.websocketGateway.emitReportUpdate(report);
      throw error;
    }
  }

  /**
   * Récupère un rapport par son ID
   */
  getReport(reportId: string): Report | undefined {
    return this.reports.get(reportId);
  }

  /**
   * Récupère tous les rapports
   */
  getAllReports(): Report[] {
    return Array.from(this.reports.values());
  }

  /**
   * Supprime un rapport
   */
  deleteReport(reportId: string): void {
    this.reports.delete(reportId);
    this.logger.log(`Rapport supprimé: ${reportId}`);
  }
}


