import { HttpException, Injectable } from '@nestjs/common';
import { HttpCode } from 'src/enum/httpCode';
import { InvoiceStatus } from 'src/enum/invoiceStatus';
import { Product } from 'src/product/product.entity';
import { BaseService } from 'src/share/BaseService';
import Util from 'src/share/util';
import { getConnection, getManager } from 'typeorm';
import SellItem from './sell-item.entity';
import { Sell } from './sell.entity';

@Injectable()
export class SellService extends BaseService<Sell> {
    constructor() {
        super();
        this.entityClass = Sell;
        this.entityName = "sell";
    }

    protected util = new Util();

    async createSale(data: Sell): Promise<Sell> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let sale: Sell = new Sell();
            sale.employeeId = data.employeeId;
            sale.customerId = data.customerId;
            sale.sellDate = data.sellDate;

            //Find the latest id in sale table
            let latestSaleId = 1;
            const latestSale = await getManager().createQueryBuilder(Sell, "sell")
                               .orderBy('id', "DESC").getOne();
            if (latestSale) {
                latestSaleId = latestSale.id + 1;
            }
            const size = 8;
            const prefixInvoice = "FR-";
            
            sale.invoice = this.util.generateInvoice(latestSaleId, size, prefixInvoice);
            sale.amount = data["total"];
            sale.finalAmount = data["total"];
            await queryRunner.manager.save(Sell, sale);

            //Create Sale Items
            if (data.sellItems) {
                let itemLen = data.sellItems.length;
                for (let i = 0; i < itemLen; i++) {
                    let item = data.sellItems[i];
                    let saleItem: SellItem = new SellItem();
                    saleItem.sellId = sale.id;
                    saleItem.productId = item.productId;
                    saleItem.qty = item.qty;
                    saleItem.price = item.price;
                    saleItem.amount = item.amount

                    const product = await queryRunner.manager.findOne(Product, { id: saleItem.productId });

                    if (product.qty === 0) {
                        throw new HttpException('Sorry the item your order is out of stock', HttpCode.OUT_OF_STOCK);
                    } else if (product.qty < item.qty) {
                        throw new HttpException('Sorry the item is not enough', HttpCode.NOT_ENOUGH_STOCK);
                    }
                    const decreasQty = product.qty - saleItem.qty;

                    queryRunner.manager.update(Product, {id: product.id}, {qty: decreasQty});
                    await queryRunner.manager.save(SellItem, saleItem);
                };
                
            }
            data.id = sale.id;
            queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            queryRunner.release();
        }
        return data;
    }
}
