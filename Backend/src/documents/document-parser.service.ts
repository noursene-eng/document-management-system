import { Injectable, Logger } from '@nestjs/common';
import * as pdfParse from 'pdf-parse';
import * as mammoth from 'mammoth';

@Injectable()
export class DocumentParserService {
  private readonly logger = new Logger(DocumentParserService.name);

  /**
   * Extrait le texte d'un fichier PDF
   */
  async parsePDF(buffer: Buffer): Promise<string> {
    try {
      const data = await pdfParse(buffer);
      return data.text;
    } catch (error) {
      this.logger.error(`Erreur lors de l'extraction PDF: ${error.message}`);
      throw new Error(`Impossible d'extraire le texte du PDF: ${error.message}`);
    }
  }

  /**
   * Extrait le texte d'un fichier Word (.docx)
   */
  async parseWord(buffer: Buffer): Promise<string> {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (error) {
      this.logger.error(`Erreur lors de l'extraction Word: ${error.message}`);
      throw new Error(`Impossible d'extraire le texte du document Word: ${error.message}`);
    }
  }

  /**
   * Extrait le texte d'un fichier en fonction de son type MIME
   */
  async parseDocument(buffer: Buffer, mimeType: string): Promise<string> {
    if (mimeType === 'application/pdf') {
      return this.parsePDF(buffer);
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimeType === 'application/msword'
    ) {
      return this.parseWord(buffer);
    } else if (mimeType.startsWith('text/')) {
      return buffer.toString('utf-8');
    } else {
      throw new Error(`Type de fichier non supporté: ${mimeType}`);
    }
  }
}
