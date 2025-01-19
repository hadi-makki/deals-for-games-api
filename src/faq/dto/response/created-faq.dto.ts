import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { MainDto } from 'src/main-classes/main-dto';

export class CreatedFaqDto extends MainDto {
  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsString()
  answer: string;
}
