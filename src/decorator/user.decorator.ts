import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { use } from "passport";
import { User } from "src/user/user.entity";
import { getManager, getRepository } from "typeorm";


export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        const find = getRepository(User).createQueryBuilder("user")
                    .select("user.id")
                    .addSelect("user.userName")
                    .where("user.userName = :username", {username: user.userName})
                    .getOne();
        return find;
    },
  );