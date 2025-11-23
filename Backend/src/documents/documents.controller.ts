import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService, DocumentType } from './documents.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('documents')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload un document' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        type: {
          type: 'string',
          enum: ['legal', 'financial', 'other'],
        },
      },
    },
  })
  @ApiQuery({ name: 'type', enum: DocumentType, required: false })
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Query('type') type?: DocumentType,
  ) {
    const document = await this.documentsService.createDocument(file, type || DocumentType.OTHER);
    return document;
  }

  @Post(':id/process')
  @ApiOperation({ summary: 'Traite un document (extraction du texte)' })
  async processDocument(@Param('id') id: string) {
    return this.documentsService.processDocument(id);
  }

  @Get()
  @ApiOperation({ summary: 'Récupère tous les documents' })
  async getAllDocuments() {
    return this.documentsService.getAllDocuments();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un document par son ID' })
  async getDocument(@Param('id') id: string) {
    return this.documentsService.getDocument(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprime un document' })
  async deleteDocument(@Param('id') id: string) {
    await this.documentsService.deleteDocument(id);
    return { message: 'Document supprimé avec succès' };
  }
}
