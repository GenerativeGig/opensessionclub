import { Field, Int, ObjectType } from "type-graphql";
import JSON from "graphql-type-json";
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

  @Field(() => JSON)
  @Column({ type: "json" })
  text: JSON;

  @Field(() => Int)
  @Column()
  sessionId: number;

  @ManyToOne(() => Session, (session) => session.comments)
  session: Session;

  @Column()
  creatorId: number;

  @Field(() => Actor)
  @ManyToOne(() => Actor, (actor) => actor.createdComments)
  creator: Actor;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
