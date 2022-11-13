import path from "path";
import { DataSource } from "typeorm";
import { POSTGRES_PASSWORD, POSTGRES_USERNAME } from "./constants";
import { Actor } from "./entities/actor.entity";
import { ActorSession } from "./entities/actorSession.entity";
import { Session } from "./entities/session.entity";
import { SessionComment } from "./entities/sessionComment.entity";

export const dataSource: DataSource = new DataSource({
  entities: [Actor, Session, SessionComment, ActorSession],
  migrations: [path.join(__dirname, "./migrations/*")],
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: "open",
  type: "postgres",
  logging: true,
  synchronize: true,
});
