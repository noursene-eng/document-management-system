import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as MinIO from 'minio';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);
  private minioClient: MinIO.Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.minioClient = new MinIO.Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT', 'localhost'),
      port: parseInt(this.configService.get<string>('MINIO_PORT', '9000')),
      useSSL: this.configService.get<string>('MINIO_USE_SSL', 'false') === 'true',
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY', 'minioadmin'),
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY', 'minioadmin'),
    });

    this.bucketName = this.configService.get<string>('MINIO_BUCKET_NAME', 'documents');
  }

  async onModuleInit() {
    await this.ensureBucketExists();
  }

  /**
   * Vérifie et crée le bucket s'il n'existe pas
   */
  private async ensureBucketExists() {
    try {
      const exists = await this.minioClient.bucketExists(this.bucketName);
      if (!exists) {
        await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
        this.logger.log(`Bucket "${this.bucketName}" créé avec succès`);
      } else {
        this.logger.log(`Bucket "${this.bucketName}" existe déjà`);
      }
    } catch (error) {
      this.logger.error(`Erreur lors de la création du bucket: ${error.message}`);
      throw error;
    }
  }

  /**
   * Upload un fichier vers MinIO
   */
  async uploadFile(
    file: Express.Multer.File,
    folder: string = 'uploads',
  ): Promise<{ objectName: string; url: string; size: number }> {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const objectName = `${folder}/${uuidv4()}.${fileExtension}`;

      const metaData = {
        'Content-Type': file.mimetype,
        'Original-Name': file.originalname,
      };

      await this.minioClient.putObject(
        this.bucketName,
        objectName,
        file.buffer,
        file.size,
        metaData,
      );

      const url = await this.getFileUrl(objectName);

      this.logger.log(`Fichier uploadé: ${objectName}`);

      return {
        objectName,
        url,
        size: file.size,
      };
    } catch (error) {
      this.logger.error(`Erreur lors de l'upload: ${error.message}`);
      throw error;
    }
  }

  /**
   * Récupère l'URL d'un fichier (presigned URL valide 7 jours)
   */
  async getFileUrl(objectName: string, expiry: number = 7 * 24 * 60 * 60): Promise<string> {
    try {
      return await this.minioClient.presignedGetObject(this.bucketName, objectName, expiry);
    } catch (error) {
      this.logger.error(`Erreur lors de la génération de l'URL: ${error.message}`);
      throw error;
    }
  }

  /**
   * Télécharge un fichier depuis MinIO
   */
  async downloadFile(objectName: string): Promise<Buffer> {
    try {
      const chunks: Buffer[] = [];
      const stream = await this.minioClient.getObject(this.bucketName, objectName);

      return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
      });
    } catch (error) {
      this.logger.error(`Erreur lors du téléchargement: ${error.message}`);
      throw error;
    }
  }

  /**
   * Supprime un fichier de MinIO
   */
  async deleteFile(objectName: string): Promise<void> {
    try {
      await this.minioClient.removeObject(this.bucketName, objectName);
      this.logger.log(`Fichier supprimé: ${objectName}`);
    } catch (error) {
      this.logger.error(`Erreur lors de la suppression: ${error.message}`);
      throw error;
    }
  }

  /**
   * Liste tous les fichiers d'un dossier
   */
  async listFiles(prefix: string = ''): Promise<string[]> {
    try {
      const objectsList: string[] = [];
      const stream = this.minioClient.listObjects(this.bucketName, prefix, true);

      return new Promise((resolve, reject) => {
        stream.on('data', (obj) => {
          if (obj.name) {
            objectsList.push(obj.name);
          }
        });
        stream.on('end', () => resolve(objectsList));
        stream.on('error', reject);
      });
    } catch (error) {
      this.logger.error(`Erreur lors de la liste des fichiers: ${error.message}`);
      throw error;
    }
  }
}
