import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqEntity } from './entities/faq.entity';
import { UserEntity } from 'src/user/user.entity';
import { ManagerEntity } from 'src/manager/manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FaqEntity, UserEntity, ManagerEntity])],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
