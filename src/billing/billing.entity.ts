import { Sell } from "src/sell/sell.entity";
import { 
    Column,
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { PayMethod } from "./payMethod.entity";


@Entity()
export class Billing {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    sellId: number

    @Column()
    payMethodId: number

    @Column()
    payDate: Date;

    @Column({type: 'double'})
    tender: number

    @ManyToOne(type => Sell)
    @JoinColumn()
    sell: Sell

    @OneToOne(() => PayMethod)
    @JoinColumn()
    payMethod: PayMethod;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}