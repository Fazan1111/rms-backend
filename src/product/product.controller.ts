import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
    constructor(
        private service: ProductService
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
    @Post('/store')
    async store(@Body() data: Product) {
        return await this.service.insert(data);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update/:id')
    async update(@Param('id') id: number, @Body() data: Product) {

    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:ids')
    async delete(@Req() req) {
        const ids = req.body.ids;
        return await this.service.delete(ids);
    }
}
