import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Actor } from "./actor.entity";
import { SessionChat } from "./sessionChat.entity";
// TODO Convert to typeorm and setup for graphql
@Entity()
export class SessionChatMessage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ type: "string" })
  text: string;

  @ManyToOne(() => Actor)
  creator: Actor;

  @ManyToOne(() => SessionChat)
  sessionChat: SessionChat;
}
