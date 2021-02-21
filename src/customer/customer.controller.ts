import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Controller('/customer')
export class CustomerController {
    constructor(private service: CustomerService){}

    @Get('/lists')
    async lists() {
        return await this.service.lists();
    }

    @Get('/detail/:id')
    async detail(@Param('id') id: number) {
        return await this.service.getOne(id);
    }

    @Post('/store')
    async store(@Body() customer: Customer) {
        return await this.service.store(customer);
    }

    @Put('/update/:id')
    async update(@Param('id') id: number, @Body() customer: Customer) {
        return await this.service.update(id, customer);
    }

    @Delete('delete/:id')
    async destroy(@Param('id') id: number) {
        return await this.service.delete(id);
    }
}
