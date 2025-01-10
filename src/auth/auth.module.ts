import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import TokenEntity from 'src/token/token.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity])],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtService,
    ConfigService,
    TokenService,
  ],
})
export class AuthModule {}
