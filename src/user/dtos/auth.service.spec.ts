import { Test } from "@nestjs/testing"
import { User } from "../user.entity"
import { UserService } from "../user.service"
import { AuthService } from "./auth.service"

it('can create an instance of auth service', () => {
    // Ts understand Paratial : partial version of userservice
    //<UserService> is a type annotation
    const fakeUserService: Partial<UserService> = {
        find: () => Promise.resolve([]),
        /**
         * as user is used to provide the instance of User Entity so that Hooks of entity can be avoided 
         * for giving ts  error
         * @param email 
         * @param password 
         * @returns 
         */
        create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User)
    }
    const module = Test.createTestingModule({
        providers: [AuthService, {
            provide: UserService, // Provider 
            useValue: fakeUserService // Mocking of UserService
        }]
    }).compile();
})