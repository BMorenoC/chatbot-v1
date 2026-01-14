import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Importamos el módulo HTTP
import { ServeStaticModule } from '@nestjs/serve-static'; // Importamos el módulo de archivos estáticos
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // 1. Configuramos HTTP para poder "llamar" a n8n
    HttpModule,

    // 2. Configuramos la carpeta pública para servir el HTML
    // Esto hace que lo que pongas en la carpeta "client" sea accesible en el navegador
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
