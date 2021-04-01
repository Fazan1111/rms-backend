import { Injectable} from '@nestjs/common';
import { BaseService } from 'src/share/BaseService';
import { Supplier } from './supplier.entity';

@Injectable()
export class SupplierService extends BaseService<Supplier> {
    constructor(){
        super();
        this.entityClass = Supplier;
        this.entityName =  "supplier";
    } 
}
