import path from "path";
import { DataSource } from "typeorm";
import {
  POSTGRES_HOST,
  POSTGRES_USE_SSL,
  POSTGRES_PASSWORD,
  POSTGRES_USERNAME,
  POSTGRES_PORT,
} from "./constants";
import { Actor } from "./entities/actor.entity";
import { ActorSession } from "./entities/actorSession.entity";
import { Discord } from "./entities/discord.entity";
import { Session } from "./entities/session.entity";
import { SessionComment } from "./entities/sessionComment.entity";

export const dataSource: DataSource = new DataSource({
  entities: [Actor, Discord, Session, SessionComment, ActorSession],
  migrations: [path.join(__dirname, "./migrations/*")],
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: "open",
  type: "postgres",
  logging: true,
  synchronize: true,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  ssl: POSTGRES_USE_SSL,
});
