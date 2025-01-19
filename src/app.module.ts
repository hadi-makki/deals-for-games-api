import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { DatabaseModule } from './database/database.module';
import { FaqModule } from './faq/faq.module';
import { GamesModule } from './games/games.module';
import { loggerMiddleware } from './logger/logger.service';
import { MediaModule } from './media/media.module';
import { S3Module } from './s3/s3.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { TokenModule } from './token/token.module';
import { TutorialsModule } from './tutorials/tutorials.module';
import { UserModule } from './user/user.module';
import { ManagerModule } from './manager/manager.module';
import { ManagerSeeding } from './seeder/managers.seeding';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from './manager/manager.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ManagerEntity]),
    ConfigModule,
    DatabaseModule,
    MediaModule,
    S3Module,
    UserModule,
    AuthModule,
    TokenModule,
    FaqModule,
    GamesModule,
    CardsModule,
    SubscriptionsModule,
    TutorialsModule,
    ManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService, ManagerSeeding],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes('*'); // Apply to all routes
  }
}
