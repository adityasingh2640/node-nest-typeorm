import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './dtos/auth.service';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMiddleware } from './middlewares/create-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, AuthService
  //   , {
  //   provide: APP_INTERCEPTOR,
  //   useClass: CurrentUserInterceptor  // As we have create a middleware for CurrentUserMiddleware
  // }
]
})

export class UserModule {
  configure(consume: MiddlewareConsumer) {
    consume.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
