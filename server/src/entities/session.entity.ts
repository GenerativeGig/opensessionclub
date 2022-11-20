import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Actor } from "./actor.entity";
import { ActorSession } from "./actorSession.entity";
import { SessionComment } from "./sessionComment.entity";

@ObjectType()
@Entity()
export class Session extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  text: string;

  @Field(() => String)
  @Column()
  start: Date;

  @Field(() => String)
  @Column()
  stop: Date;

  @Field(() => Int)
  @Column({ type: "int" })
  attendeeLimit: number;

  @Field(() => Int)
  @Column()
  creatorId: number;

  @Field(() => Actor)
  @ManyToOne(() => Actor, (actor) => actor.createdSessions)
  creator: Actor;

  @OneToMany(() => ActorSession, (actorSession) => actorSession.session)
  actorConnection: ActorSession[];

  @OneToMany(() => SessionComment, (sessionComment) => sessionComment.sessionId)
  comments: SessionComment[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
