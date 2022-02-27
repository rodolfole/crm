import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Users } from "./Users.entity";

@ObjectType()
@Entity()
export class Clients extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field({ nullable: true })
  @Column({ default: "", nullable: true })
  phone!: string;

  @Field()
  @Column()
  sellerId!: number;

  @Field((_type) => Users)
  @ManyToOne(() => Users, (user) => user.clients)
  seller!: Users;

  @Field(() => String)
  @CreateDateColumn({ type: "date" })
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "date" })
  updatedAt!: Date;
}
