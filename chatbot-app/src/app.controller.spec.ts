import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            sendMessageToN8N: jest
              .fn()
              .mockResolvedValue({ text: 'Respuesta Mock IA' }),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('chat', () => {
    it('debería devolver la respuesta de la IA', async () => {
      const result = await appController.chat({ message: 'Hola test' });

      expect(result).toEqual({ text: 'Respuesta Mock IA' });

      // FIX: Desactivamos la regla de "unbound-method" solo para esta línea
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(appService.sendMessageToN8N).toHaveBeenCalledWith('Hola test');
    });
  });
});
