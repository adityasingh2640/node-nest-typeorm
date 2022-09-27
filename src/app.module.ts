import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './user/user.entity';
import { Reports } from './reports/reports.entity';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
/**
 * Due to some setting in tsConfig.json for Nest we can not use import statment instead
 * we have to use require statment for 'Cookie-session' module
 */
const cookieSession = require('cookie-session');
/**
 * ConfigModule : Used for identifying which .env file to choose
 * ConfigService: Used to apply specific properties from choose .env file
 */
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DBNAME'),
          entities: [User, Reports],
          synchronize: true
        }
      }
    }), UserModule, ReportsModule],
  controllers: [AppController],
  providers: [{
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true
    })
  }]
})

export class ApplicationModule {
  configure(consume: MiddlewareConsumer) {
    consume.apply(cookieSession({ keys: ['use_for_encrypting_cookie'] })).forRoutes('*');
  }
}
