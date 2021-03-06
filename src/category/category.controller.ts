import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
    constructor(
        private service: CategoryService
    ) {}


    @UseGuards(JwtAuthGuard)
    @Get('/lists')
    async list() {
        return await this.service.findMany();
    }


    @UseGuards(JwtAuthGuard)
    @Get('/detail/:id')
    async detail(@Param('id') id: number) {
        return await this.service.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update/:id')
    async update(@Param('id') id: number, @Body() customer: Category) {
        return await this.service.update(id, customer);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    async destroy(@Req() req) {
        const ids = req.body.ids;
        return await this.service.delete(ids);
    }

}
