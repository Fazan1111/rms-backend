import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Supplier } from './supplier.entity';
import { SupplierService } from './supplier.service';

@Controller('/supplier')
export class SupplierController {
    constructor(
        private service: SupplierService
    ){}

    @Get('/lists')
    async lists() {
        return await this.service.getLists();
    }

    @Get('/detail/:id')
    async detail(@Param('id') id: number) {
        return await this.service.getOne(id);
    }

    @Post('/store')
    async store(@Body() supplier: Supplier) {
        return await this.service.store(supplier);
    }

    @Put('/update/:id')
    async update(@Param('id') id: number, @Body() supplier: Supplier) {
        return await this.service.update(id, supplier);
    }

    @Delete('delete/:id')
    async destroy(@Param('id') id: number) {
        return await this.service.delete(id);
    }

}
