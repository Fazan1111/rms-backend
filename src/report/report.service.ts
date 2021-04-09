import { Injectable } from '@nestjs/common';
import { Product } from 'src/product/product.entity';
import { Purchase } from 'src/purchase/purchase.entity';
import { PurchaseItem } from 'src/purchase/purchaseItem.entity';
import SellItem from 'src/sell/sell-item.entity';
import Filter from 'src/share/filter';
import { getRepository } from 'typeorm';

@Injectable()
export class ReportService {


    async getPurchaseItemsReport(filter?: Filter) {
        const query = getRepository(PurchaseItem).createQueryBuilder("purchaseItem")
        .leftJoinAndSelect(`purchaseItem.purchase`, "purchase")
        .leftJoinAndSelect(`purchaseItem.product`, "product")
        .select("purchaseItem.id", "id")
        .addSelect("product.id", "product_id")
        .addSelect("product.name", "name")
        .addSelect("product.sku", "sku")
        .addSelect("SUM(purchaseItem.qty)", "qty")
        .groupBy("product.id");

        /*
        console.log('data filter', filter);
        if (filter.id) {
            console.log('df', filter.id);
            query.where(`product.id = :id`, {id: filter.id})
        }

        if (filter.rangeFilter[0] != undefined && filter.rangeFilter[1] != undefined) {
            console.log('picker', filter.rangeFilter[0]);
            const startDate = filter.rangeFilter[0];
            const endDate = filter.rangeFilter[1];
            query.andWhere(`purchaseItem.createdAt >= :start AND purchaseItem.createdAt <= :end`, {
                start: startDate, end: endDate
            }) 
        }
        */
       
        
        const results = query.orderBy("product.id", "ASC").getRawMany();

        return results;
    }

    async getSellItemsReport() {
        const query = await getRepository(SellItem).createQueryBuilder("sellItem")
        .leftJoinAndSelect(`sellItem.sell`, "sell")
        .leftJoinAndSelect(`sellItem.product`, "product")
        .select("sellItem.id", "id")
        .addSelect("product.id", "product_id")
        .addSelect("product.name", "name")
        .addSelect("product.sku", "sku")
        .addSelect("SUM(sellItem.qty)", "qty")
        .groupBy("product.id");

        const results = query.orderBy("product.id", "ASC").getRawMany();
        return results;
    }

    async getStockReport() {
        const query = getRepository(Product).createQueryBuilder("product")
        .select("id")
        .addSelect("name")
        .addSelect("sku")
        .addSelect("SUM(qty)", "qty")
        .groupBy("id");

        return await query.orderBy("id").getRawMany();
    }
}
