import { Controller, Get, Param, Delete, UseInterceptors, UploadedFile, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload un fichier vers MinIO' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.storageService.uploadFile(file);
  }

  @Get('url/:objectName')
  @ApiOperation({ summary: 'Récupère l\'URL d\'un fichier' })
  async getFileUrl(@Param('objectName') objectName: string) {
    const url = await this.storageService.getFileUrl(objectName);
    return { url };
  }

  @Get('download/:objectName')
  @ApiOperation({ summary: 'Télécharge un fichier' })
  async downloadFile(@Param('objectName') objectName: string) {
    const buffer = await this.storageService.downloadFile(objectName);
    return buffer;
  }

  @Delete(':objectName')
  @ApiOperation({ summary: 'Supprime un fichier' })
  async deleteFile(@Param('objectName') objectName: string) {
    await this.storageService.deleteFile(objectName);
    return { message: 'Fichier supprimé avec succès' };
  }
}
