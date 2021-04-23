import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Category } from './category.entity';
import { CurrentUser } from 'src/decorator/user.decorator';

@Controller('/category')
export class CategoryController {
    constructor(
        private service: CategoryService
    ) {}


    @UseGuards(JwtAuthGuard)
    @Get('/lists')
    async list() {
        return await this.service.findMany(null, null);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/store')
    async store(@Body() data: Category, @CurrentUser() user: any) {
        return await this.service.insert(data, user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/detail/:id')
    async detail(@Param('id') id: number) {
        return await this.service.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update/:id')
    async update(
        @Param('id') id: number, 
        @Body() customer: Category,
        @CurrentUser() user: any
        ) {
        return await this.service.update(id, customer, user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    async destroy(@Req() req, @CurrentUser() user: any) {
        const ids = req.body.ids;
        return await this.service.delete(ids, user.userId);
    }

}
