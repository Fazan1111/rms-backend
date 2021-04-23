import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PayMethod } from 'src/billing/payMethod.entity';
import { CurrentUser } from 'src/decorator/user.decorator';
import { PayMethodService } from './pay-method.service';

@Controller('pay-method')
export class PayMethodController {
    constructor(private service: PayMethodService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/lists')
    async lists() {
        return this.service.findMany(null, null);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/store')
    async insert(@Body() data: PayMethod, @CurrentUser() user: any) {
        return this.service.insert(data, user.userId);
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
        @Body() data: PayMethod,
        @CurrentUser() user
    ) {
        return this.service.update(id, data, user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    async destroy(@Req() req, @CurrentUser() user: any) {
        const ids = req.body.ids;
        return await this.service.delete(ids, user.userId);
    }
}
