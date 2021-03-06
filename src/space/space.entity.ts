import
{
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class Space {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string

    @Column()
    code: string

    @Column({type: "float"})
    size: number

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
