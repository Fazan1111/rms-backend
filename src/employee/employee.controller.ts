import { Controller, Get, Param, UseGuards, Post, Body, Put, Delete, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/decorator/user.decorator';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';

@Controller('/employee')
export class EmployeeController {
    constructor(
        private service: EmployeeService
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('/lists')
    async list() {
        return await this.service.findMany(null, null);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/detail/:id')
    async detail(@Param('id') id: number) {
        return await this.service.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/store')
    async store(@Body() data: Employee, @CurrentUser() user: any) {
        return await this.service.insert(data, user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update/:id')
    async update(
        @Param('id') id: number,
        @Body() data: Employee,
        @CurrentUser() user: any
    ) {
        return await this.service.update(id, data, user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    async delete(@Req() req, @CurrentUser() user: any) {
        const ids = req.body.ids;
        return await this.service.delete(ids, user.userId);
    }
}
