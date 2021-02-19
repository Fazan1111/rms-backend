import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('/user')
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

    @Post('/store')
    async store(@Body() user: User) {
        return await this.service.store(user); 
        
    }
}
