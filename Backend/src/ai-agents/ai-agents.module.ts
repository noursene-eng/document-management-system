import { Module } from '@nestjs/common';
import { GroqService } from './groq.service';
import { AiAgentsService } from './ai-agents.service';

@Module({
  providers: [GroqService, AiAgentsService],
  exports: [AiAgentsService],
})
export class AiAgentsModule {}
