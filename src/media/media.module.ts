import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Service } from 'src/s3/s3.service';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from './media.entity';
import { HttpService } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([MediaEntity])],
  controllers: [MediaController],
  providers: [MediaService, S3Service, ConfigService],
})
export class MediaModule {}
