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

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
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

  @Field(() => Boolean)
  @Column()
  isRemote: boolean;

  @Column({ type: "varchar", nullable: true })
  voiceChannelId: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  voiceChannelUrl: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  location: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isCancelled: boolean;

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
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}

// TODO: if something changes to a session the attendees are also notified
// cron jobs are cancelled and rescheduled
