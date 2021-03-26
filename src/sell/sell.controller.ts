import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Sell } from './sell.entity';
import { SellService } from './sell.service';

@Controller('sell')
export class SellController {
    constructor(private service: SellService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/lists')
    async list() {
        const entities:string[] = [
            "customer",
            "employee",
            "sellItem"
        ];

        return this.service.findMany(
            [
                {
                    entityName: entities[0],
                    relation: "customer",
                    relationType: "INNER"
                },
                {
                    entityName: entities[1],
                    relation: "employee",
                    relationType: "INNER"
                },
                {
                    entityName: entities[2],
                    relation: "sellItem",
                    relationType: "LEFT",
                    subRelation: {
                        name: "product"
                    }
                }
            ], 
            null
        );
    }


    @UseGuards(JwtAuthGuard)
    @Post('/store')
    async createSale(@Body() data: Sell) {
        return this.service.createSale(data);
    }
}
