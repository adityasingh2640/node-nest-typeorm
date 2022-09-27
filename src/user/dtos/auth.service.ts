import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UserService } from "../user.service";
import { getHashedPassword } from "../../utils/genericUtils";

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }
    // Signup user, creating user in database
    async signup(email: string, password: string) {
        const user = await this.userService.find(email);
        if (user.length) {
            throw new BadRequestException('Email is in use!');
        }
        // Hash user password
        // Generate a salt
       let result = await getHashedPassword(password);
        const userInstance = await this.userService.create(email, result);
        return userInstance;
    }
    async signin(email:string,password:string){
        const [user] = await this.userService.find(email);
        if(!user){
            throw new NotFoundException('Login failed !');
        }
        const [salt,storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if(storedHash !== hash.toString('hex')){
            throw new NotFoundException('Login failed !');
        }
        return user;
    }
}