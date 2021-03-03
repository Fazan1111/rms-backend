import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
    constructor(private service: UserService) {
    }

    @Get('/lists')
    async lists() {
        const response = await this.service.getLists();
        return response;
    }

    @Get('/detail/:id')
    async detail(@Param('id') id: number) {

    }

    @Post('/findName')
    async findByName(
      @Body() user: User
    ) {
        return await this.service.findByName(user);
    }

    @Post('/store')
    async store(@Body() user: User) {
        return await this.service.store(user);

    }
}
