import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleId: number

    @Column({nullable: true})
    firstName: string

    @Column({nullable: true})
    lastName: string

    @Column()
    userName: string

    @Column()
    userType: number

    @Column()
    email: string

    @Column()
    password: string

    @Column({nullable: true})
    apiToken: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
