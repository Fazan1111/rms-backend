import { HttpException, Injectable } from "@nestjs/common";
import { HttpCode } from "src/enum/httpCode";
import { Connection, getConnection, getRepository, ObjectType } from "typeorm";


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

    async findMany() {
        const query = await getRepository(this.repository)
                      .createQueryBuilder(this.entityName)
                      .getMany();

        if(!query) {
            throw new HttpException('There are data available', HttpCode.NotFound);
        }

        return query;
    }

    async insert(data: any) {
        return await getConnection().createQueryBuilder().insert()
                    .into(this.repository).values(data).execute();
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
