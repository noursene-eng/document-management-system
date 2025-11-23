import { Injectable, Logger } from '@nestjs/common';
import { GroqService } from './groq.service';

export enum ReportType {
  SYNTHESIS = 'synthesis',
  COMPETITIVE_ANALYSIS = 'competitive_analysis',
  BUSINESS_PLAN = 'business_plan',
}

@Injectable()
export class AiAgentsService {
  private readonly logger = new Logger(AiAgentsService.name);

  constructor(private readonly groqService: GroqService) {}

  /**
   * Génère une synthèse globale du dossier
   */
  async generateSynthesis(documentsText: string[]): Promise<string> {
    const combinedText = documentsText.join('\n\n--- Document suivant ---\n\n');
    const systemPrompt = `Tu es un expert en analyse de documents juridiques et financiers. 
    Ton rôle est de créer une synthèse globale, claire et structurée des documents fournis.
    La synthèse doit être en français et inclure:
    - Un résumé exécutif
    - Les points clés identifiés
    - Les risques et opportunités
    - Les recommandations principales`;

    const prompt = `Analyse les documents suivants et génère une synthèse globale détaillée:\n\n${combinedText}`;

    this.logger.log('Génération de la synthèse...');
    return this.groqService.generateResponse(prompt, systemPrompt);
  }

  /**
   * Génère une analyse concurrentielle
   */
  async generateCompetitiveAnalysis(documentsText: string[]): Promise<string> {
    const combinedText = documentsText.join('\n\n--- Document suivant ---\n\n');
    const systemPrompt = `Tu es un expert en stratégie d'entreprise et analyse concurrentielle.
    Ton rôle est d'analyser les documents fournis et de générer une analyse concurrentielle approfondie.
    L'analyse doit être en français et inclure:
    - Identification des concurrents
    - Analyse des forces et faiblesses
    - Positionnement sur le marché
    - Recommandations stratégiques`;

    const prompt = `Analyse les documents suivants et génère une analyse concurrentielle détaillée:\n\n${combinedText}`;

    this.logger.log('Génération de l\'analyse concurrentielle...');
    return this.groqService.generateResponse(prompt, systemPrompt);
  }

  /**
   * Génère un business plan
   */
  async generateBusinessPlan(documentsText: string[]): Promise<string> {
    const combinedText = documentsText.join('\n\n--- Document suivant ---\n\n');
    const systemPrompt = `Tu es un expert en création d'entreprise et rédaction de business plans.
    Ton rôle est d'analyser les documents fournis et de générer un business plan complet et professionnel.
    Le business plan doit être en français et inclure:
    - Résumé exécutif
    - Description de l'entreprise
    - Analyse de marché
    - Stratégie marketing et commerciale
    - Plan opérationnel
    - Projections financières
    - Besoins en financement
    - Analyse des risques`;

    const prompt = `Analyse les documents suivants et génère un business plan complet et détaillé:\n\n${combinedText}`;

    this.logger.log('Génération du business plan...');
    return this.groqService.generateResponse(prompt, systemPrompt);
  }

  /**
   * Génère un rapport en fonction du type
   */
  async generateReport(
    reportType: ReportType,
    documentsText: string[],
  ): Promise<string> {
    switch (reportType) {
      case ReportType.SYNTHESIS:
        return this.generateSynthesis(documentsText);
      case ReportType.COMPETITIVE_ANALYSIS:
        return this.generateCompetitiveAnalysis(documentsText);
      case ReportType.BUSINESS_PLAN:
        return this.generateBusinessPlan(documentsText);
      default:
        throw new Error(`Type de rapport non supporté: ${reportType}`);
    }
  }

  /**
   * Génère un rapport en streaming
   */
  async *generateReportStream(
    reportType: ReportType,
    documentsText: string[],
  ): AsyncGenerator<string, void, unknown> {
    const combinedText = documentsText.join('\n\n--- Document suivant ---\n\n');
    let systemPrompt = '';
    let prompt = '';

    switch (reportType) {
      case ReportType.SYNTHESIS:
        systemPrompt = `Tu es un expert en analyse de documents juridiques et financiers. 
        Génère une synthèse globale, claire et structurée en français.`;
        prompt = `Analyse les documents suivants et génère une synthèse globale:\n\n${combinedText}`;
        break;
      case ReportType.COMPETITIVE_ANALYSIS:
        systemPrompt = `Tu es un expert en stratégie d'entreprise. 
        Génère une analyse concurrentielle approfondie en français.`;
        prompt = `Analyse les documents suivants et génère une analyse concurrentielle:\n\n${combinedText}`;
        break;
      case ReportType.BUSINESS_PLAN:
        systemPrompt = `Tu es un expert en création d'entreprise. 
        Génère un business plan complet et professionnel en français.`;
        prompt = `Analyse les documents suivants et génère un business plan:\n\n${combinedText}`;
        break;
      default:
        throw new Error(`Type de rapport non supporté: ${reportType}`);
    }

    this.logger.log(`Génération du rapport ${reportType} en streaming...`);
    yield* this.groqService.generateStream(prompt, systemPrompt);
  }
}
