import { Body, Controller, Get, Request, Query, UseGuards, Param, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/decorator/user.decorator';
import Filter from 'src/share/filter';
import { ReportService } from './report.service';

@Controller('report/lists')
export class ReportController {
    constructor(
        private service: ReportService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/purchase-items')
    async getPurchaseItemsReport(
        @Query('productId') productId: number,
        @Query('start') start: Date,
        @Query('end') end: Date,
        @CurrentUser() user
    ) {

        console.log(user);
        
        let filter: Filter = {
            id: productId,
            rangeFilter: [start, end]
        }


        return await this.service.getPurchaseItemsReport(filter);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/sell-items')
    async getSellItemsReport() {
        return await this.service.getSellItemsReport();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/stock-report')
    async getStockReport() {
        return await this.service.getStockReport();
    }

}
