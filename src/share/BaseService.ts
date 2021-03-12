import { HttpException, Injectable } from "@nestjs/common";
import { HttpCode } from "src/enum/httpCode";
import { Connection, getConnection, getManager, getRepository, ObjectType } from "typeorm";
import Filter, { QueryRelation } from "./filter";


@Injectable()
export class BaseService<T> {
    protected repository: ObjectType<T>
    protected entityName:string = "";
    public connection: Connection;


    async findOne(id: number) {
        const query = await getRepository(this.repository)
                      .createQueryBuilder(this.entityName)
                      .where(`${this.entityName}.id = :id`, {id: id})
                      .getOne();

        if(!query) {
            throw new HttpException('Sorry data not match', HttpCode.NotFound)
        }

        return query;
    }

    async findMany(relation: QueryRelation[], filter: Filter) {
        const query = await getRepository(this.repository)
                      .createQueryBuilder(this.entityName)

        if (relation) {
            const relationSize = relation.length;
            if (relationSize > 0) {
                for (let i = 0; i < relationSize; i++) {
                    if (relation[i].relationType === "INNER") {
                        query.innerJoinAndSelect(`${this.entityName}.${relation[i].relation}`, relation[i].entityName);
                    } else {
                        query.leftJoinAndSelect(`${this.entityName}.${relation[i].relation}`, relation[i].entityName);
                    }
                }
            }
        }

        const result = query.getMany();

        if(!result) {
            throw new HttpException('There are data available', HttpCode.NotFound);
        }

        return result;
    }

    async insert(data: any) {
        return await getConnection().createQueryBuilder().insert()
                    .into(this.repository).values(data).execute();
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
          .from(this.repository)
          .where("id IN(:id)", { id: ids })
          .execute();
    }

}
