import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // ✅ 1. Importar el módulo de configuración

@Module({
  imports: [
    // 2. Activar la configuración (leer el .env)
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que esté disponible para el AppService sin importarlo de nuevo
    }),

    // 3. Configura HTTP para poder llamar a n8n
    HttpModule,

    // 4. Configura la carpeta pública para servir el HTML
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
