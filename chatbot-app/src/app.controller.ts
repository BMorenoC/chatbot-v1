import { Controller, Post, Body } from '@nestjs/common';
import { AppService, AiResponse } from './app.service'; // Importamos la interfaz

export class ChatDto {
  message!: string;
}

@Controller('api/chat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  // Especificamos que este endpoint devuelve una Promesa de tipo AiResponse
  async chat(@Body() chatDto: ChatDto): Promise<AiResponse> {
    // Como el servicio ya no devuelve "any", esta asignación ahora es segura
    const response = await this.appService.sendMessageToN8N(chatDto.message);
    return response;
  }
}
