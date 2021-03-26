import { Product } from "src/product/product.entity";
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";
import { Sell } from "./sell.entity";


@Entity()
export default class SellItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    sellId: number

    @ManyToOne(() => Sell)
    @JoinColumn()
    sell: Sell

    @Column()
    productId: number

    @ManyToOne(() => Product)
    @JoinColumn()
    product: Product

    @Column()
    qty: number

    @Column({type:'double'})
    price: number

    @Column({type: 'double'})
    amount: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}