import {
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { SessionChat } from "./sessionChat.entity";
import { Actor } from "./actor.entity";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Session {
  @Field(() => Int)
  @PrimaryKey({ type: "numeric", autoincrement: true })
  id: number;

  @Field(() => String)
  @Property({ type: "datetime" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "datetime", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({ type: "text" })
  title: string;

  /*@Property({ type: "string", default: "" })
  description: string;

  @Property({ type: "datetime" })
  startDate: Date;

  @Property({ type: "datetime" })
  endDate: Date;

  @Property({ type: "numeric" })
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
