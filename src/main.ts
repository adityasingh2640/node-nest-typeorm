import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
//import { MessagesModule } from './messages/messages.module';
import { ApplicationModule } from './app.module';
/**
 * Due to some setting in tsConfig.json for Nest we can not use import statment instead
 * we have to use require statment for 'Cookie-session' module
 */
const cookieSession = require('cookie-session'); 

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(cookieSession({keys:['use_for_encrypting_cookie']}));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
