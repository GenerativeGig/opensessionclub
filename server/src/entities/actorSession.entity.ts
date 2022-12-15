import { Field, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Actor } from "./actor.entity";
import { Session } from "./session.entity";

@Entity()
export class ActorSession extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  actorId: number;

  @ManyToOne(() => Actor, (actor) => actor.sessionConnection)
  actor: Actor;

  @Field(() => Int)
  @PrimaryColumn()
  sessionId: number;

  @ManyToOne(() => Session, (session) => session.actorConnection)
  session: Session;

  @Field(() => Boolean)
  @Column({ type: "boolean" })
  actorIsPartOfSession: boolean;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
