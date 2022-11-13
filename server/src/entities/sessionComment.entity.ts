import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Actor } from "./actor.entity";
import { Session } from "./session.entity";

@ObjectType()
@Entity()
export class SessionComment extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  text: string;

  @Field(() => Int)
  @Column()
  sessionId: number;

  @Field(() => Session)
  @ManyToOne(() => Session, (session) => session.comments)
  session: Session;

  @Field(() => Int)
  @Column()
  creatorId: number;

  @Field(() => Actor)
  @ManyToOne(() => Actor, (actor) => actor.createdComments)
  creator: Actor;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
