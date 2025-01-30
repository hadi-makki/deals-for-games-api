import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqEntity } from './entities/faq.entity';
import { UserEntity } from 'src/user/user.entity';
import { ManagerEntity } from 'src/manager/manager.entity';
import { TokenService } from 'src/token/token.service';
import TokenEntity from 'src/token/token.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FaqEntity,
      UserEntity,
      ManagerEntity,
      TokenEntity,
    ]),
  ],
  controllers: [FaqController],
  providers: [FaqService, TokenService, JwtService, ConfigService],
})
export class FaqModule {}
