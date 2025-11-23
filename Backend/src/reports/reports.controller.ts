import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { IsEnum, IsArray, IsNotEmpty, ArrayMinSize } from 'class-validator';
import { ReportsService, ReportStatus } from './reports.service';
import { ReportType } from '../ai-agents/ai-agents.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

class CreateReportDto {
  @IsEnum(ReportType)
  @IsNotEmpty()
  type: ReportType;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  documentIds: string[];
}

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @ApiOperation({ summary: 'Crée une nouvelle demande de rapport' })
  @ApiBody({ type: CreateReportDto })
  async createReport(@Body() createReportDto: CreateReportDto) {
    // Log pour debug
    console.log('Received DTO:', JSON.stringify(createReportDto));
    
    if (!createReportDto.type) {
      throw new Error('Le type de rapport est requis dans le body');
    }
    
    const report = await this.reportsService.createReport(
      createReportDto.type,
      createReportDto.documentIds || [],
    );
    return report;
  }

  @Post(':id/generate')
  @ApiOperation({ summary: 'Génère un rapport (synchrone)' })
  async generateReport(@Param('id') id: string) {
    return this.reportsService.generateReport(id);
  }

  @Get(':id/stream')
  @ApiOperation({ summary: 'Génère un rapport en streaming' })
  async streamReport(@Param('id') id: string, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
      for await (const chunk of this.reportsService.generateReportStream(id)) {
        res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
      }
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error) {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  }

  @Get()
  @ApiOperation({ summary: 'Récupère tous les rapports' })
  async getAllReports() {
    return this.reportsService.getAllReports();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un rapport par son ID' })
  async getReport(@Param('id') id: string) {
    return this.reportsService.getReport(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprime un rapport' })
  async deleteReport(@Param('id') id: string) {
    this.reportsService.deleteReport(id);
    return { message: 'Rapport supprimé avec succès' };
  }
}


