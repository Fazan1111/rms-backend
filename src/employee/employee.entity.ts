import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

export enum gender {
    Male = "male",
    Female = "female"
}

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fname: string

    @Column()
    lname: string

    @Column()
    contact: string

    @Column({
      type: "enum",
      enum: gender,
      default: gender.Male
    })
    gender: gender

    @Column()
    email: string

    @Column()
    address: string

    @Column({nullable: true})
    position: string

    @Column({nullable: true})
    idCard: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
