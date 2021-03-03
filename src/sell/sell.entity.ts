import { Customer } from "src/customer/customer.entity";
import { User } from "src/user/user.entity";
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";


@Entity()
export class Sell {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Customer)
    @JoinColumn()
    customer: Customer

    @ManyToOne(() => User)
    @JoinColumn()
    user: User

    @Column()
    sellDate: Date

    @Column()
    invoice: string

    @Column({
        type: 'double'
    })
    amount: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}