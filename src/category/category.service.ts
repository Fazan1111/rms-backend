import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) 
        private repository: Repository<Category>
    ){}

    async lists() {
        return await this.repository.find();
    }

    async getOne(id: number) {
        const result = await getRepository(Category)
                       .createQueryBuilder("category")
                       .where(`category.id = :id`, {id: id})
                       .getOne();

        return result;
    }

    async store(data: Category) {
        return await this.repository.save(data);
    }

    async update(id: number, data: Category) {
        return await getConnection()
        .createQueryBuilder()
        .update(Category)
        .set({
            name: data.name,
            code: data.code,
            note: data.note     
        })
        .where(`id = :id`, {id: id})
        .execute();
    }

    async delete(id: number) {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Category)
            .where("id = :id", { id: id })
            .execute();
    }
}
