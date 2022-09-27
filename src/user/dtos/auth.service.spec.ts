
import { Test } from "@nestjs/testing";
import { User } from "../user.entity";
import { UserService } from "../user.service";
import { AuthService } from "./auth.service";
import { getHashedPassword } from "../../utils/genericUtils";

describe('AuthService', () => {
    let service: AuthService;
    let fakeUserService: Partial<UserService>;
    beforeEach(async () => {
        // Ts understand Paratial : partial version of userservice
        //<UserService> is a type annotation
        fakeUserService = {
            find: () => Promise.resolve([]),
            /**
             * as user is used to provide the instance of User Entity so that Hooks of entity can be avoided 
             * for giving ts  error
             * @param email 
             * @param password 
             * @returns 
             */
            create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User)
        };
        const module = await Test.createTestingModule({
            providers: [AuthService, {
                provide: UserService, // Provider 
                useValue: fakeUserService // Mocking of UserService
            }]
        }).compile();
        service = module.get(AuthService);
    });
    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });
    it('creating new user with salted and hashed password', async () => {
        let password = 'XYZ';
        const user = await service.signup('xyz@testing.com', password);
        expect(user.password).not.toEqual(password);
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });
    it('throws an error if users signs up with email that is in use', async () => {
        fakeUserService.find = () =>
            Promise.resolve([
                {
                    id: 1,
                    email: 'testperson@test.com',
                    password: 'password123',
                } as User,
            ]);
        await service
            .signup('max.mustermann@gmx.com', 'password123')
            .catch((err) => {
                expect(err.message).toEqual("Email is in use!");
            });
    });
    it('throws an error if users signs up with email that is in use', async () => {
        await service
            .signin('testperson@test.com', 'password123')
            .catch((err) => {
                expect(err.message).toEqual("Login failed !");
            });
    });
    it('throws an error if users signs up with wrong password', async () => {
        fakeUserService.find = () => Promise.resolve([{ id: 1, email: 'testperson@test.com', password: 'password123' } as User]);
        await service
            .signin('testperson@test.com', 'password1234')
            .catch((err) => {
                expect(err.message).toEqual("Login failed !");
            });
    });
    it('if user provides a correct password: Positive', async () => {
        let password = 'password123';
        let result = await getHashedPassword(password);
        fakeUserService.find = () => Promise.resolve([{ id: 1, email: 'testperson@test.com', password: result } as User]);
        let user = await service.signin('testperson@test.com', 'password123');
        expect(user.password).toEqual(result);
    });
});
