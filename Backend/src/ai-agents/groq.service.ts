import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';

@Injectable()
export class GroqService {
  private readonly logger = new Logger(GroqService.name);
  private groq: Groq;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GROQ_API_KEY');
    if (!apiKey) {
      throw new Error('GROQ_API_KEY n\'est pas définie dans les variables d\'environnement');
    }
    this.groq = new Groq({ apiKey });
  }

  /**
   * Génère une réponse avec Groq
   */
  async generateResponse(
    prompt: string,
    systemPrompt?: string,
    model: string = 'llama-3.3-70b-versatile',
  ): Promise<string> {
    try {
      const messages: Groq.Chat.CompletionCreateParams.Message[] = [];

      if (systemPrompt) {
        messages.push({
          role: 'system',
          content: systemPrompt,
        });
      }

      messages.push({
        role: 'user',
        content: prompt,
      });

      const completion = await this.groq.chat.completions.create({
        messages,
        model,
        temperature: 0.7,
        max_tokens: 4096,
      });

      const response = completion.choices[0]?.message?.content || '';
      this.logger.log(`Réponse Groq générée (${response.length} caractères)`);
      return response;
    } catch (error) {
      this.logger.error(`Erreur Groq: ${error.message}`);
      throw new Error(`Erreur lors de la génération avec Groq: ${error.message}`);
    }
  }

  /**
   * Génère une réponse en streaming
   */
  async *generateStream(
    prompt: string,
    systemPrompt?: string,
    model: string = 'llama-3.3-70b-versatile',
  ): AsyncGenerator<string, void, unknown> {
    try {
      const messages: Groq.Chat.CompletionCreateParams.Message[] = [];

      if (systemPrompt) {
        messages.push({
          role: 'system',
          content: systemPrompt,
        });
      }

      messages.push({
        role: 'user',
        content: prompt,
      });

      const stream = await this.groq.chat.completions.create({
        messages,
        model,
        temperature: 0.7,
        max_tokens: 4096,
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          yield content;
        }
      }
    } catch (error) {
      this.logger.error(`Erreur Groq streaming: ${error.message}`);
      throw new Error(`Erreur lors du streaming Groq: ${error.message}`);
    }
  }
}
