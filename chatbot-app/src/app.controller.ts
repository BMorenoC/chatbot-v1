import { Controller, Post, Body } from '@nestjs/common';
import { AppService, AiResponse } from './app.service';
import { ChatDto } from './dto/chat.dto';

@Controller('api/chat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async chat(@Body() chatDto: ChatDto): Promise<AiResponse> {
    return await this.appService.sendMessageToN8N(chatDto.message);
  }
}
