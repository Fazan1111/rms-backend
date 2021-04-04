import { Billing } from "src/billing/billing.entity";
import { Customer } from "src/customer/customer.entity";
import { Employee } from "src/employee/employee.entity";
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import SellItem from "./sell-item.entity";


@Entity()
export class Sell {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    customerId: number

    @Column()
    employeeId: number

    @ManyToOne(() => Customer)
    @JoinColumn()
    customer: Customer

    @ManyToOne(() => Employee)
    @JoinColumn()
    employee: Employee

    @Column()
    sellDate: Date

    @Column()
    invoice: string

    @Column({
        type: 'double'
    })
    amount: number

    @Column({type: 'double'})
    finalAmount: number

    @Column({type: 'int', default: 0})
    status: number

    @OneToMany(() => SellItem, saleItem => saleItem.sell)
    sellItems: SellItem[];

    @OneToMany(() => Billing, billing => billing.sell)
    billing: Billing

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}