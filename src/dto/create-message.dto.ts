import { IsDateString, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  message: string;

  @IsDateString()
  timestamp: string;
}
