import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import TokenEntity from './token.entity';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity, UserEntity])],
  providers: [JwtService, TokenService, ConfigService],
  controllers: [TokenController],
})
export class TokenModule {}
