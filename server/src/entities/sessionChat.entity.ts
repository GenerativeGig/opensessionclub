import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "./session.entity";
import { SessionChatMessage } from "./sessionChatMessage.entity";
// TODO Convert to typeorm and setup for graphql
@Entity()
export class SessionChat {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(
    () => SessionChatMessage,
    (sessionChatMessage) => sessionChatMessage.sessionChat
  )
  messages: SessionChatMessage[];

  // @OneToOne()
  session: Session;
}
