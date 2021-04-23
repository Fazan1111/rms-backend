import { HttpException, Injectable } from "@nestjs/common";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { HttpCode } from "src/enum/httpCode";
import { Connection, getConnection, getManager, getRepository, ObjectType } from "typeorm";
import Filter, { QueryRelation } from "./filter";


@Injectable()
export class BaseService<T> {
    protected entityClass: ObjectType<T>
    protected entityName:string = "";
    public connection: Connection;
    public activityLogService = new ActivityLogService();


    async findOne(id: number, relation?: QueryRelation[]) {
        const query = getRepository(this.entityClass).createQueryBuilder(this.entityName);
        if (relation) {
            relation.forEach((relationClass, i) => {
                if (relationClass.relationType === "INNER") {
                    query.innerJoinAndSelect(`${this.entityName}.${relationClass.relation}`, relationClass.entityName);
                } else {
                    query.leftJoinAndSelect(`${this.entityName}.${relationClass.relation}`, relationClass.entityName);
                    if (relationClass.subRelation) {
                        query.leftJoinAndSelect(`${relationClass.entityName}.${relationClass.subRelation["name"]}`, relationClass.subRelation["name"])
                    }
                }
            })
        }

        const result = await query.where(`${this.entityName}.id = :id`, {id: id}).getOne();
        if(!result) {
            throw new HttpException('Sorry data not exist', HttpCode.NotFound)
        }

        return result;
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
                    if (relationClass.subRelation) {
                        query.leftJoinAndSelect(`${relationClass.entityName}.${relationClass.subRelation["name"]}`, relationClass.subRelation["name"])
                    }
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

    async insert(data: any, userId:number) {
        await getManager().transaction(async manager => {
            await manager.save(this.entityName, data);
            let module = this.entityName,
                method = 'Post';

            await this.activityLogService.addUserActivity(userId, module, method);
        })
    }

    async update(id: number, data: any, userId:number) {
        await getManager().transaction(async manager => {
            const query = await manager.update(this.entityName, {id: id}, data);

            let module = this.entityName,
                method = 'Put';

            await this.activityLogService.addUserActivity(userId, module, method);
            return query;
        })
    }

    async delete(ids: any, userId:number) {
      await getConnection()
          .createQueryBuilder()
          .delete()
          .from(this.entityClass)
          .where("id IN(:id)", { id: ids })
          .execute();

          let module = this.entityName,
          method = 'Delete';

        await this.activityLogService.addUserActivity(userId, module, method);
    }

}
