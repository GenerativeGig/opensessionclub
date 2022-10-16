import { Entity, OneToMany, OneToOne, PrimaryKey } from "@mikro-orm/core";
import { Session } from "./session.entity";
import { SessionChatMessage } from "./sessionChatMessage.entity";

@Entity()
export class SessionChat {
  @PrimaryKey({ type: "numeric" })
  id!: number;

  @OneToMany(
    () => SessionChatMessage,
    (sessionChatMessage) => sessionChatMessage.sessionChat
  )
  messages: SessionChatMessage[];

  @OneToOne({ entity: () => Session })
  session: Session;
}
