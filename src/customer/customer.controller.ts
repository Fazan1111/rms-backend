import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/decorator/user.decorator';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Controller('/customer')
export class CustomerController {
    constructor(private service: CustomerService){}

    @UseGuards(JwtAuthGuard)
    @Get('/lists')
    async lists() {
        return await this.service.findMany(null, null);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/detail/:id')
    async detail(@Param('id') id: number) {
        return await this.service.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/store')
    async store(@Body() customer: Customer, @CurrentUser() user: any) {
        return await this.service.insert(customer, user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update/:id')
    async update(
        @Param('id') id: number, 
        @Body() customer: Customer,
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
