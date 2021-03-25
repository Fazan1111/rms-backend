import { Employee } from "src/employee/employee.entity";
import { Supplier } from "src/supplier/supplier.entity";
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
import { PurchaseItem } from "./purchaseItem.entity";


@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    employeeId: number;

    @Column()
    supplierId: number;

    @Column()
    purchaseDate: Date;

    @Column({type: "double"})
    amount: number;

    @ManyToOne(() => Supplier)
    @JoinColumn()
    supplier: Supplier;

    @ManyToOne(() => Employee)
    @JoinColumn()
    employee: Employee;

    @OneToMany(() => PurchaseItem, purItem => purItem.purchase)
    purchaseItems: PurchaseItem[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}