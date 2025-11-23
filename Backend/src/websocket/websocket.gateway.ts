import {
  WebSocketGateway as WSGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Report } from '../reports/reports.service';

@WSGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
})
export class WebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(WebSocketGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connecté: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client déconnecté: ${client.id}`);
  }

  /**
   * Émet une mise à jour de rapport à tous les clients
   */
  emitReportUpdate(report: Report) {
    this.server.emit('report:update', report);
    this.logger.log(`Mise à jour du rapport ${report.id} envoyée`);
  }

  /**
   * Émet une mise à jour de document à tous les clients
   */
  emitDocumentUpdate(document: any) {
    this.server.emit('document:update', document);
    this.logger.log(`Mise à jour du document envoyée`);
  }
}