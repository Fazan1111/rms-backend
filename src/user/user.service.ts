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

    async findOne(id: number): Promise<Users | undefined> {
        return this.repository.findOne({where: {id: id}});
    }

    async update(id: number, data: User) {
        const user = await this.repository.findOne({where: {id: id}});
        console.log('user', data);
        if (user) {
            return await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    userName: data.userName,
                    userType: data.userType,
                    email: data.email 
                })
                .where(`id = :id`, {id: id})
                .execute();
        } else {
            throw new HttpException(`User no exist`, HttpCode.NotFound);
        }

    }

    async changePassword(id: number, data: User) {
        const user = await this.repository.findOne({where: {id: id}});

        if (user) {
            const match = await bcrypt.compare(data.password, user.password);
            if (match) {
                let newPassword = await bcrypt.hash(data.password, 10);
                await getConnection().createQueryBuilder()
                .update(User)
                .set({password: newPassword})
                .where(`id = :id`, {id: id}).execute();
            } else {
                return new HttpException('Incorrect password please try again', HttpCode.INCORRECT_USER);
            }
        } else {
            return new HttpException('User not found', HttpCode.NotFound);
        }
    }

    async delete(ids: any) {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("id IN(:id)", { id: ids })
            .execute();
      }

}
