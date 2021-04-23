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

    @Column()
    categoryId: number

    @ManyToOne(() => Category)
    @JoinColumn()
    category: Category

    @ManyToOne(() => Space)
    @JoinColumn()
    space: Space

    @Column()
    name: string

    @Column({nullable: true})
    sku: string

    @Column({type: "float", default: 0})
    qty: number

    @Column({type: "double", nullable: true})
    cost: number

    @Column({type: "double", nullable: true})
    price: number

    @Column({nullable: true})
    note: string

    @Column({
        type: "int",
        nullable: true
    })
    stockStatus: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}