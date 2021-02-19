import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) {}
    
    async getLists() {
        return await this.repository.find();
    }

    async store(data: User) {
        let user: User = new User();
        user.roleId = data.roleId;
        user.userName = data.userName;
        user.userType = data.userType;
        user.email = data.email;

        const random = 20;
        const hash = await bcrypt.hash(data.password, random);
        user.password = hash;
        return this.repository.save(user);
    }
}
