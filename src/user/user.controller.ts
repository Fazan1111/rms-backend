import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
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
        return this.service.findOne(id);
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

    @UseGuards(JwtAuthGuard)
    @Put('/update/:id')
    async update(@Param('id') id: number, @Body() data: User) {
        return await this.service.update(id, data);
    }


    @UseGuards(JwtAuthGuard)
    @Put('/change-password/:id')
    async changePassword(@Param('id') id: number, @Body() data: User) {
        return await this.service.changePassword(id, data);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    async destroy(@Req() req) {
        const ids = req.body.ids;
        return await this.service.delete(ids);
    }
}
