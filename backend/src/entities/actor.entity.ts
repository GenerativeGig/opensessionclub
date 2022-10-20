import {
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Session } from "./session.entity";

@Entity()
export class Actor {
  @PrimaryKey({ type: "numeric" })
  id!: number;

  @Property({ type: "datetime" })
  createdAt = new Date();

  @Property({ type: "datetime", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: "string" })
  name: string;
  /*
  @ManyToMany(() => Session, (session) => session.attendees)
  sessions: Session[];

  @OneToMany(() => Session, (session) => session.creator)
  createdSessions: Session[];
*/
}
