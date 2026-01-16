import { Controller, Post, Body } from '@nestjs/common';
import { AppService, AiResponse } from './app.service';
// 👇 ESTA LÍNEA ES LA CLAVE. Importamos el DTO desde su carpeta.
import { ChatDto } from './dto/chat.dto';

@Controller('api/chat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async chat(@Body() chatDto: ChatDto): Promise<AiResponse> {
    // Pasamos el mensaje y el ID (que puede ser undefined, pero el servicio ya lo maneja)
    return await this.appService.sendMessageToN8N(
      chatDto.message,
      chatDto.sessionId,
    );
  }
}
