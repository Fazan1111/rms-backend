import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';


export type Users = any;

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) {}

    private readonly users = [
      {
        id: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'maria',
        password: 'guess'
      },
    ];

    async getLists() {
        return await this.repository.find();
    }

    async store(data: User) {
        const user = await this.repository.findOne({ where: { userName: data.userName } });
        if(user && data.userName == user.userName) {
            throw new BadRequestException('user name already exist');
        }
        data.password = await bcrypt.hash(data.password, 10);
        return this.repository.save(data);
    }

    async findByName(userName: string, password: string): Promise<Users | undefined> {
        return await this.repository.findOne({where: {userName: userName}});
    }

    async findOne(username: string): Promise<Users | undefined> {
      return this.users.find(user => user.username === username);
    }
}
