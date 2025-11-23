import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DocumentsModule } from './documents/documents.module';
import { StorageModule } from './storage/storage.module';
import { AiAgentsModule } from './ai-agents/ai-agents.module';
import { ReportsModule } from './reports/reports.module';
import { WebSocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    StorageModule,
    DocumentsModule,
    AiAgentsModule,
    ReportsModule,
    WebSocketModule,
  ],
})
export class AppModule {}
