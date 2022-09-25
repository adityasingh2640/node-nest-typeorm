import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query,UseInterceptors,ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user-interceptor.dto';

@Controller('auth')
@Serialize(UserDto)// Custom Interceptor using custom Decorator
export class UserController {
    constructor(private userService: UserService) { }
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        const User = this.userService.create(body.email, body.password);
        return User;
    }
   // @UseInterceptors(ClassSerializerInterceptor) // Default Nest interceptor
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.userService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException(`User not found with id ${id}`);
        }
        return user;
    }
    @Get()
    async findAllUser(@Query('email') email: string) {
        const user = await this.userService.find(email);
        if(!user){
            throw new NotFoundException(`User not found with email id ${email}`);
        }
        return user
    }
    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body);
    }
    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id));
    }
}
