import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import TokenEntity from 'src/token/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
