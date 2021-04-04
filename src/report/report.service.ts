import { Injectable } from '@nestjs/common';
import { Product } from 'src/product/product.entity';
import { Purchase } from 'src/purchase/purchase.entity';
import { PurchaseItem } from 'src/purchase/purchaseItem.entity';
import SellItem from 'src/sell/sell-item.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class ReportService {


    async getPurchaseItemsReport() {
        const query = await getRepository(PurchaseItem).createQueryBuilder("purchaseItem")
        .leftJoinAndSelect(`purchaseItem.purchase`, "purchase")
        .leftJoinAndSelect(`purchaseItem.product`, "product")
        .getMany();

        return query;
    }

    async getSellItemsReport() {
        const query = await getRepository(SellItem).createQueryBuilder("sellItem")
        .leftJoinAndSelect(`sellItem.sell`, "sell")
        .leftJoinAndSelect(`sellItem.product`, "product")
        .getMany();

        return query;
    }

    async getStockReport() {
        const query = await getRepository(Product).createQueryBuilder("product").getMany();
        return query;
    }
}
