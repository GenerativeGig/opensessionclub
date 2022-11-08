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
  end: Date;

  @Field(() => Int)
  @Column({ type: "int" })
  attendeeLimit: number;

  @Field(() => Int)
  @Column()
  creatorId: number;

  @ManyToOne(() => Actor, (actor) => actor.sessions)
  creator: Actor;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
  /*@Column({ default: "" })
  description: string;

  @Column({ type: "datetime" })
  startDate: Date;

  @Column({ type: "datetime" })
  endDate: Date;

  @Column({ type: "numeric" })
  attendeeLimit: number;

  @ManyToMany(() => Actor, (actor) => actor.sessions, { owner: true })
  attendees: Actor[];

  @ManyToOne(() => Actor)
  creator: Actor;

  @OneToOne({
    entity: () => SessionChat,
  })
  chat: SessionChat;*/
}
