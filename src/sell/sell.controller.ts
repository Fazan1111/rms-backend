import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/decorator/user.decorator';
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
            "employee"
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
                }
            ], 
            null
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('/detail/:id')
    async getDetail(@Param('id') id: number) {
        const entities: string[] = [
            "customer",
            "employee",
            "sellItem",
            "billing"
        ]

        return this.service.findOne(id, [
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
                relation: "sellItems",
                relationType: "LEFT",
                subRelation: {
                    name: "product"
                }
            },
            {
                entityName: entities[3],
                relation: "billing",
                relationType: "LEFT",
                subRelation: {
                    name: "payMethod"
                }
            }
        ])
    }


    @UseGuards(JwtAuthGuard)
    @Post('/store')
    async createSale(@Body() data: Sell, @CurrentUser() user: any) {
        console.log(data);
        return this.service.createSale(data, user.userId);
    }
}
