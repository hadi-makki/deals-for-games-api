import { ApiProperty } from '@nestjs/swagger';
import { MainDto } from 'src/main-classes/main-dto';

export class UserCreatedDto extends MainDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  token: string;
}
