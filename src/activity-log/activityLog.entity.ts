import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class ActivityLog {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    method: string

    @Column()
    module: string

    @Column({type: 'text'})
    description: string

    @ManyToOne(() => User)
    @JoinColumn()
    user: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}