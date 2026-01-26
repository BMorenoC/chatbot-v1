import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Si no instalaste swagger, borra esta línea

export class ChatDto {
  @ApiProperty({ example: 'Hola', description: 'Mensaje del usuario' })
  @IsString({ message: 'El mensaje debe ser texto' })
  @IsNotEmpty({ message: 'No puedes enviar un mensaje vacío' })
  message!: string;

  @ApiProperty({
    example: 'abc-123',
    description: 'ID de sesión único',
    required: false,
  })
  @IsString()
  @IsOptional() // Importante: Es opcional para no romper peticiones antiguas
  sessionId?: string;
}
