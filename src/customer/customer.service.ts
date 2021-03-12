import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/share/BaseService';
import { getConnection } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService extends BaseService<Customer> {
    constructor(){
        super();
        this.repository = Customer;
        this.entityName =  "customer";
    }

    // async update(id: number, data: Customer) {
    //     return await getConnection()
    //     .createQueryBuilder()
    //     .update(Customer)
    //     .set({
    //         name: data.name,
    //         contact: data.contact,
    //         email: data.email,
    //         address: data.address,
    //         note: data.note     
    //     })
    //     .where(`id = :id`, {id: id})
    //     .execute();
    // }

}
