import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Billing } from './billing.entity';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
    constructor(private service: BillingService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/lists')
    async list() {
        const entities:string[] = [
            "sell",
            "payMethod",
        ];


        return this.service.findMany(
            [
                {
                    entityName: entities[0],
                    relation: "sell",
                    relationType: "LEFT",
                    subRelation: {
                        name: "customer"
                    }
                },
                {
                    entityName: entities[1],
                    relation: "payMethod",
                    relationType: "LEFT"
                }
            ]
            , 
            null
        )
    }

    @UseGuards(JwtAuthGuard)
    @Post('/store')
    async receivedPayment(@Body() data: Billing) {
        return await this.service.createPayment(data);
    }
}
