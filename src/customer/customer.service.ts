import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private repository: Repository<Customer>
    ){}

    async lists() {
        return await this.repository.find();
    }

    async getOne(id: number) {
        const result = await getRepository(Customer)
                       .createQueryBuilder("customer")
                       .where(`customer.id = :id`, {id: id})
                       .getOne();

        return result;
    }

    async store(data: Customer) {
        return await this.repository.save(data);
    }

    async update(id: number, data: Customer) {
        return await getConnection()
        .createQueryBuilder()
        .update(Customer)
        .set({
            name: data.name,
            contact: data.contact,
            email: data.email,
            address: data.address,
            note: data.note     
        })
        .where(`id = :id`, {id: id})
        .execute();
    }

    async delete(id: number) {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Customer)
            .where("id = :id", { id: id })
            .execute();
    }
}
