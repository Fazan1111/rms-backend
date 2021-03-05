import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
    constructor(private service: UserService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('/lists')
    async lists() {
        const response = await this.service.getLists();
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/detail/:id')
    async detail(@Param('id') id: number) {

    }

    @UseGuards(JwtAuthGuard)
    @Post('/findName')
    async findByName(@Req() req) {
        return await this.service.findByName(req.body.userName, req.body.password);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/store')
    async store(@Body() user: User) {
        return await this.service.store(user);

    }
}
