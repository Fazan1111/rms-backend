import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { HttpCode } from 'src/enum/httpCode';
import { InvoiceStatus } from 'src/enum/invoiceStatus';
import { Sell } from 'src/sell/sell.entity';
import { BaseService } from 'src/share/BaseService';
import { getConnection, getManager } from 'typeorm';
import { Billing } from './billing.entity';

@Injectable()
export class BillingService extends BaseService<Billing> {
    constructor() {
        super();
        this.entityClass = Billing;
        this.entityName = "billing";
    }

    async createPayment(data: Billing) {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let output = '';
        try {
            //Find invoice
            const sale = await queryRunner.manager.findOne(Sell, {id: data.sellId});
            if (sale) {
                // Check if invoice already paid
                if (sale.finalAmount == 0) {
                    throw new HttpException('Invoice has paid', HttpCode.INVOICE_HAS_PAID);
                } else if (sale.finalAmount < data.tender) {
                    throw new HttpException('Error you have paid more than invoice amount', HttpCode.INVOICE_OVER_AMOUNT);
                }

                let billing: Billing = new Billing();
                billing.sellId = data.sellId;
                billing.payDate = data.payDate;
                billing.payMethodId = data.payMethodId;
                billing.tender = data.tender;
                await queryRunner.manager.save(Billing, billing);

                //Update Invoice
                let modifyAmount = sale.finalAmount - data.tender;
                if (data.tender < sale.finalAmount) {
                    queryRunner.manager.update(Sell, {id: sale.id}, {finalAmount: modifyAmount, status: InvoiceStatus.SOME_PAY});
                } else if (data.tender == sale.finalAmount) {
                    queryRunner.manager.update(Sell, {id: sale.id}, {finalAmount: modifyAmount, status: InvoiceStatus.PAID});
                }

                queryRunner.commitTransaction();
                output = 'Create payment success';
            } else {
                throw new HttpException('Invoice not found', HttpCode.INVOICE_NOT_FOUND);
            }
        } catch (err) {
            output = "Error can not create payment";
            queryRunner.rollbackTransaction();
            throw new err;
            
        } finally {
            queryRunner.release();
        }

        return data;
    }
}
