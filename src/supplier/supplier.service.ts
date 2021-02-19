import { Injectable, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, Repository } from 'typeorm';
import { Supplier } from './supplier.entity';

@Injectable()
export class SupplierService {
    constructor(
        @InjectRepository(Supplier)
        private repository: Repository<Supplier>
    ) {}

    async getLists() {
        return await this.repository.find();
    }

    async getOne(id: number) {
        const result = await getRepository(Supplier)
                       .createQueryBuilder("supplier")
                       .where(`supplier.id = :id`, {id: id})
                       .getOne();

        return result;
    }

    async store(data: Supplier) {
        return await this.repository.save(data);
    }

    async update(id: number, data: Supplier) {
        return await getConnection()
        .createQueryBuilder()
        .update(Supplier)
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
            .from(Supplier)
            .where("id = :id", { id: id })
            .execute();
    }
}
