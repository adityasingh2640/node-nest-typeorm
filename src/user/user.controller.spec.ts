import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './dtos/auth.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let fakeUserService: Partial<UserService>;
  beforeEach(async () => {
    fakeUserService = {
      findOne: (id: number) => Promise.resolve({ id: 1, email: 'xyz@xyz.com', password: '1234' } as User),
      find: (email: string) => Promise.resolve([{ id: 1, email, password: '1234' } as User]),
    };
    let fakeAuthService: Partial<AuthService> = {
      signup: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User),
      signin: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User),
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: AuthService, useValue: fakeAuthService }, { provide: UserService, useValue: fakeUserService }]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined: Positive', () => {
    expect(controller).toBeDefined();
  });
  it('find all user , return user with given user array: Positive', async () => {
    let user = await controller.findAllUser('xyz@xyz.com');
    expect(user.length).toEqual(1);
    expect(user[0].email).toEqual('xyz@xyz.com');
  });
  it('find user with id , return an user: Positive', async () => {
    let user = await controller.findUser('1');
    expect(user.id).toEqual(1);
    expect(user.email).toEqual('xyz@xyz.com');
  });
  it('find user with non-existing id , return an user: Negative', async () => {
    fakeUserService.findOne = (id: number) => Promise.resolve({} as User);
    await controller.findUser('12').catch(err => expect(err.message).toEqual('User not found with id 12'));
  });
  it('sign-in , return an user: Positive', async () => {
    const session = {userId:-10};
    const user = await controller.signin({email:'xyz@xyz.com',password:'1234'},session);
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
