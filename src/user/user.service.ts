import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { HttpCode } from 'src/enum/httpCode';


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

    async update(id: number, data: User) {
        const user = await this.repository.findOne({where: {userName: id}});
        if (user) {
            const matchPassword = await bcrypt.compare(data.password, user.password);
            if (matchPassword) {
                const password = await bcrypt.hash(data.password, 10);
                return await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    userName: data.userName,
                    userType: data.userType,
                    email: data.email,
                    password: password     
                })
                .where(`id = :id`, {id: id})
                .execute();
            } else {
                throw new HttpException(`Username or password not correct`, HttpCode.NotFound);
            }
        } else {
            throw new HttpException(`User no exist`, HttpCode.NotFound);
        }

    }
}
