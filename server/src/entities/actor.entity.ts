import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ActorSession } from "./actorSession.entity";
import { Discord } from "./discord.entity";
import { Session } from "./session.entity";
import { SessionComment } from "./sessionComment.entity";

@ObjectType()
@Entity()
export class Actor extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  lowerCaseName: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  lowerCaseEmail: string;

  @Column()
  password: string;

  @OneToOne(() => Discord, { nullable: true })
  @JoinColumn()
  discord: Discord;

  @OneToMany(() => Session, (session) => session.creator)
  createdSessions: Session[];

  @OneToMany(() => ActorSession, (actorSession) => actorSession.actor)
  sessionConnection: ActorSession[];

  @OneToMany(() => SessionComment, (sessionComment) => sessionComment.creator)
  createdComments: SessionComment[];

  @Field(() => String)
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
