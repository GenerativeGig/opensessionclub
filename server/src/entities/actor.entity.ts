import {
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Session } from "./session.entity";

@ObjectType()
@Entity()
export class Actor {
  @Field(() => Int)
  @PrimaryKey({ type: "numeric", autoincrement: true })
  id!: number;

  @Field(() => String)
  @Property({ type: "datetime" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "datetime", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({ type: "text", unique: true })
  name!: string;

  @Property({ type: "text", unique: true })
  lowerCaseName!: string;

  @Field(() => String)
  @Property({ type: "text", unique: true })
  email!: string;

  @Property({ type: "text" })
  password!: string;
  /*
  @ManyToMany(() => Session, (session) => session.attendees)
  sessions: Session[];

  @OneToMany(() => Session, (session) => session.creator)
  createdSessions: Session[];
*/
}
