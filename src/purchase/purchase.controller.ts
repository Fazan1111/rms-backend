import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/decorator/user.decorator';
import { Purchase } from './purchase.entity';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
export class PurchaseController {
    constructor(private service: PurchaseService) {}


    @UseGuards(JwtAuthGuard)
    @Get('/lists')
    async list() {

        const entities:string[] = [
            "supplier",
            "employee",
            "purchaseItem"
        ]
        return this.service.findMany(
            [
                {
                    entityName: entities[0],
                    relation: "supplier",
                    relationType: "INNER"
                },
                {
                    entityName: entities[1],
                    relation: "employee",
                    relationType: "INNER"
                },
                {
                    entityName: entities[2],
                    relation: "purchaseItems",
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
    async createPurchase(@Body() data: Purchase, @CurrentUser() user: any) {
        return this.service.createPurcase(data, user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update/:id') 
    async updatePurchase(id:number, data: Purchase) {
        return this.service.updatePurchase(id, data);
    }

}
 