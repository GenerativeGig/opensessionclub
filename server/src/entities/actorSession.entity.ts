import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Actor } from "./actor.entity";
import { Session } from "./session.entity";

@ObjectType()
@Entity()
export class ActorSession extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  actorId: number;

  @ManyToOne(() => Actor, (actor) => actor.sessionConnection)
  @JoinColumn({ name: "actorId" })
  actor: Actor;

  @PrimaryColumn()
  @Column()
  sessionId: number;

  @ManyToOne(() => Session, (session) => session.actorConnection)
  @JoinColumn({ name: "sessionId" })
  session: Session;

  @Field(() => Boolean)
  @Column({ type: "boolean" })
  actorIsPartOfSession: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
