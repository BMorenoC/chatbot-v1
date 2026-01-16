import { IsString, IsNotEmpty } from 'class-validator';

export class ChatDto {
  /* eslint-disable @typescript-eslint/no-unsafe-call */
  @IsString({ message: 'El mensaje debe ser texto' })
  /* eslint-disable @typescript-eslint/no-unsafe-call */
  @IsNotEmpty({ message: 'No puedes enviar un mensaje vacío' })
  message!: string;
}
