import { Category } from "src/category/category.entity";
import { Space } from "src/space/space.entity";
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
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Category)
    @JoinColumn()
    category: Category

    @ManyToOne(() => Space)
    @JoinColumn()
    space: Space

    @Column()
    name: string

    @Column()
    sku: string

    @Column({type: "float"})
    qty: number

    @Column({type: "double"})
    cost: number

    @Column({type: "double"})
    price: number

    @Column()
    note: string

    @Column({type: "int"})
    stockStatus: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}