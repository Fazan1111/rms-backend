import { Injectable } from '@nestjs/common';
import { Product } from 'src/product/product.entity';
import { BaseService } from 'src/share/BaseService';
import { getConnection, getManager } from 'typeorm';
import { Purchase } from './purchase.entity';
import { PurchaseItem } from './purchaseItem.entity';

@Injectable()
export class PurchaseService extends BaseService<Purchase> {
    constructor() {
        super();
        this.entityClass = Purchase;
        this.entityName = "purchase";
    }

    
    async createPurcase(data: Purchase): Promise<Purchase> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let purchase: Purchase = new Purchase();
            purchase.employeeId = data.employeeId;
            purchase.supplierId = data.supplierId;
            purchase.purchaseDate = data.purchaseDate;
            purchase.invoice = data.invoice;
            purchase.amount = data.amount;
            await queryRunner.manager.save(Purchase, purchase);

            if (data.purchaseItems) {
                data.purchaseItems.forEach(async item => {
                    let purchItem: PurchaseItem = new PurchaseItem();
                    purchItem.purchaseId = purchase.id;
                    purchItem.productId = item.productId;
                    purchItem.qty = item.qty;
                    purchItem.price = item.price;

                    const product = await queryRunner.manager.findOne(Product, { id: purchItem.productId });
                    const increasQty = product.qty + purchItem.qty;

                    queryRunner.manager.update(Product, {id: product.id}, {qty: increasQty});
                    await queryRunner.manager.save(PurchaseItem, purchItem);
                   
                });
            }

            data.id = purchase.id;
            await queryRunner.commitTransaction();
        } catch(err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
        return data;
    }


    async updatePurchase(id:number, data: Purchase): Promise<Purchase> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const purchItems = data.purchaseItems;
            delete data.purchaseItems;
            await queryRunner.manager.update(Purchase, {id: id}, data);

            if (purchItems) {
                purchItems.forEach(async item => {
                    await queryRunner.manager.update(PurchaseItem, {id: item.id}, item);
                });
            }
        
            queryRunner.commitTransaction();
        } catch (err) {
            queryRunner.rollbackTransaction();
        } finally {
            queryRunner.release();
        }

        return data;
    }
}
