import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

// 1. Definimos el contrato: ¿Qué nos devuelve n8n?
export interface AiResponse {
  text: string;
}

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async sendMessageToN8N(
    message: string,
    sessionId?: string,
  ): Promise<AiResponse> {
    // Leemos la URL (y agregamos un fallback por seguridad)
    const n8nWebhookUrl =
      this.configService.get<string>('N8N_WEBHOOK_URL') ||
      'http://localhost:5678/webhook/chat';

    try {
      // SessionId en el paquete para n8n
      const payload = {
        message: message,
        sessionId: sessionId || 'anonimo', // Si es undefined, mandamos 'anonimo'
      };

      const response = await firstValueFrom(
        // Indicamos a axios que esperamos un objeto tipo AiResponse
        this.httpService.post<AiResponse>(n8nWebhookUrl, payload),
      );

      // 3. Devolvemos la data tipada
      return response.data;
    } catch (error) {
      let errorMessage = 'Error desconocido';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Error conectando con n8n:', errorMessage);
      throw new HttpException(
        'El agente de IA no está disponible en este momento.',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
