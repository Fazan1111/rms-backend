import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReportService } from './report.service';

@Controller('report/lists')
export class ReportController {
    constructor(
        private service: ReportService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/purchase-items')
    async getPurchaseItemsReport() {
        return await this.service.getPurchaseItemsReport();
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
