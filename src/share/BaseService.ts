import { HttpException, Injectable } from "@nestjs/common";
import { HttpCode } from "src/enum/httpCode";
import { Connection, getConnection, getManager, getRepository, ObjectType } from "typeorm";
import Filter, { QueryRelation } from "./filter";


@Injectable()
export class BaseService<T> {
    protected entityClass: ObjectType<T>
    protected entityName:string = "";
    public connection: Connection;


    async findOne(id: number) {
        const query = await getRepository(this.entityClass)
                      .createQueryBuilder(this.entityName)
                      .where(`${this.entityName}.id = :id`, {id: id})
                      .getOne();

        if(!query) {
            throw new HttpException('Sorry data not match', HttpCode.NotFound)
        }

        return query;
    }

    async findMany(relation: QueryRelation[], filter: Filter) {
        const query = await getRepository(this.entityClass)
                      .createQueryBuilder(this.entityName)

        if (relation) {
            relation.forEach((relationClass, i) => {
                if (relationClass.relationType === "INNER") {
                    query.innerJoinAndSelect(`${this.entityName}.${relationClass.relation}`, relationClass.entityName);
                } else {
                    query.leftJoinAndSelect(`${this.entityName}.${relationClass.relation}`, relationClass.entityName);
                }
            })   
        }

        if (filter && filter.categoryId) {
            query.andWhere(`${this.entityName}.${filter.categoryId} = :categoryId`, {categoryId: filter.categoryId});
        }

        const result = query.getMany();

        if(!result) {
            throw new HttpException('There are data available', HttpCode.NotFound);
        }

        return result;
    }

    async insert(data: any) {
        await getManager().transaction(async manager => {
            return await manager.save(this.entityName, data);
        })
    }

    async update(id: number, data: any) {
        await getManager().transaction(async manager => {
            const query = await manager.update(this.entityName, {id: id}, data);
            return query;
        })
    }

    async delete(ids: any) {
      await getConnection()
          .createQueryBuilder()
          .delete()
          .from(this.entityClass)
          .where("id IN(:id)", { id: ids })
          .execute();
    }

}
