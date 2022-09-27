import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
//import { MessagesModule } from './messages/messages.module';
import { ApplicationModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  //app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('NestJS Realworld Example App')
    .setDescription('The Realworld API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3000);
}
bootstrap();
