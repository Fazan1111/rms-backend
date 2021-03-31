import { Injectable } from '@nestjs/common';
import { PayMethod } from 'src/billing/payMethod.entity';
import { BaseService } from 'src/share/BaseService';

@Injectable()
export class PayMethodService extends BaseService<PayMethod> {
    constructor() {
        super();
        this.entityClass = PayMethod;
        this.entityName = "payMethod";
    }

}
