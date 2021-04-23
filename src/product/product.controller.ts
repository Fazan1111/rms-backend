import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Product } from './product.entity';
import { CurrentUser } from 'src/decorator/user.decorator';

@Controller('products')
export class ProductController {
    constructor(
        private service: ProductService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/lists')
    async list() {
        let entities: string[] = [
            "category"
        ]


        return await this.service.findMany(
            [
                {
                    entityName: entities[0],
                    relation: "category",
                    relationType: "INNER"
                }
            ], 
            null
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('/detail/:id')
    async detail(@Param('id') id: number) {
        return await this.service.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/store')
    async store(@Body() data: Product, @CurrentUser() user: any) {
        return await this.service.insert(data, user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update/:id')
    async update(
        @Param('id') id: number, 
        @Body() data: Product,
        @CurrentUser() user: any
    ) {
        return await this.service.update(id, data, user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:ids')
    async delete(@Req() req, @CurrentUser() user: any) {
        const ids = req.body.ids;
        return await this.service.delete(ids, user.userId);
    }
}
