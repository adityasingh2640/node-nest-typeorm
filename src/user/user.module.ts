import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './dtos/auth.service';
import { CurrentUserMiddleware } from './middlewares/create-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, AuthService]
})

export class UserModule {
  configure(consume: MiddlewareConsumer) {
    consume.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
