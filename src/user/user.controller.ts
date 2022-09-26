import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user-interceptor.dto';
import { AuthService } from './dtos/auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)// Custom Interceptor using custom Decorator
export class UserController {
    constructor(private userService: UserService, private authService: AuthService) { }
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto , @Session() session:any) {
        const user =  await this.authService.signup(body.email,body.password);
        session.userId = user.id;
        return user
    }
    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session:any) {
        const user =  await this.authService.signin(body.email,body.password);
        session.userId = user.id;
        return user
    }
    @Get('/whoamI')
    @UseGuards(AuthGuard)
    whoamI(@CurrentUser() user:User) {
        if(user){
            return user;
        }
        throw new NotFoundException('Please log in first !');
    }
    @Post('/signOut')
    signOut(@Session() session:any){
        session.userId = null;
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
