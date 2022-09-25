import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
//import { MessagesModule } from './messages/messages.module';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
