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

@Entity()
export class Session {
  @PrimaryKey({ type: "numeric" })
  id!: number;

  @Property({ type: "datetime" })
  createdAt = new Date();

  @Property({ type: "datetime", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: "string" })
  title!: string;

  @Property({ type: "string" })
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
  chat: SessionChat;
}
