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
import { Purchase } from "./purchase.entity";


@Entity()
export class PurchaseItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    purchaseId: number;

    @Column()
    productId: number;

    @Column()
    qty: number;

    @Column({type: "double"})
    price: number;

    @ManyToOne(() => Purchase, purchase => purchase.purchaseItems)
    purchase: Purchase;

    @ManyToOne(() => Product)
    @JoinColumn()
    product: Product;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}