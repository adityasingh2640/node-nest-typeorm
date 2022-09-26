import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return this.repo.save(user);
    }
    findOne(id: number) {
        if(!id){
            throw new NotFoundException('Please sign in or sign up');
        }
        return this.repo.findOneBy({ id });
    }
    find(email: string) {
        return this.repo.find({ where: { email } });
    }
    async update(id: number, attr: Partial<User>) {
        const user = await this.repo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User not found with id ${id}`);
        }
        Object.assign(user, attr);
        return this.repo.save(user);
    }
    async remove(id: number) {
        const user = await this.repo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User not found with id ${id}`);
        }
        return this.repo.remove(user); //alternative delete, but hook will not work with delete
    }
}