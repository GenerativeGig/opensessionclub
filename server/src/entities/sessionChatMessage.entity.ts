import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Actor } from "./actor.entity";
import { SessionChat } from "./sessionChat.entity";

@Entity()
export class SessionChatMessage {
  @PrimaryKey({ type: "numeric" })
  id!: number;

  @Property({ type: "datetime" })
  createdAt = new Date();

  @Property({ type: "datetime", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: "string" })
  text: string;

  @ManyToOne(() => Actor)
  creator: Actor;

  @ManyToOne(() => SessionChat)
  sessionChat: SessionChat;
}
