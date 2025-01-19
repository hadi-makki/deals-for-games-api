import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManagerEntity } from './manager.entity';
import { ManagerService } from './manager.service';
import { TokenService } from 'src/token/token.service';
import TokenEntity from 'src/token/token.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/user/user.entity';
import { ManagerController } from './manager.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity, TokenEntity, UserEntity])],
  providers: [ManagerService, TokenService, JwtService, ConfigService],
  controllers: [ManagerController],
})
export class ManagerModule {}
