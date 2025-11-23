import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { DocumentsModule } from '../documents/documents.module';
import { AiAgentsModule } from '../ai-agents/ai-agents.module';
import { WebSocketModule } from '../websocket/websocket.module';

@Module({
  imports: [DocumentsModule, AiAgentsModule, WebSocketModule],
  providers: [ReportsService],
  controllers: [ReportsController],
  exports: [ReportsService],
})
export class ReportsModule {}
