import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { PurchaseItem } from './purchase/purchaseItem.entity';
import SellItem from './sell/sell-item.entity';
import { Sell } from './sell/sell.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getHomeData() {
    const purchaseItems = await getManager().createQueryBuilder(PurchaseItem, "purchaseItem")
                      .select("SUM(purchaseItem.qty)", "qty")
                      .getRawOne();

    const saleItems = await getManager().createQueryBuilder(SellItem, "sellItem")
                      .select("SUM(sellItem.qty)", "qty")
                      .getRawOne();

    const invoices = await getManager().createQueryBuilder(Sell, "sell")
                     .select("COUNT(sell.invoice)", "qty")
                     .getRawOne();

    return {
      "data" : {
        purchaseItems,
        saleItems,
        invoices
      }
    }
    
  }
}
