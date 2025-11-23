import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { StorageModule } from '../storage/storage.module';
import { DocumentParserService } from './document-parser.service';

@Module({
  imports: [StorageModule],
  providers: [DocumentsService, DocumentParserService],
  controllers: [DocumentsController],
  exports: [DocumentsService],
})
export class DocumentsModule {}
