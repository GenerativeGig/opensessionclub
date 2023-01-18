import fs from "fs";
import path from "path";
import { DataSource } from "typeorm";
import {
  POSTGRES_HOST,
  POSTGRES_CA,
  POSTGRES_PASSWORD,
  POSTGRES_USERNAME,
  POSTGRES_PORT,
  POSTGRES_URL,
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
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  ssl: POSTGRES_CA
    ? {
        rejectUnauthorized: true,
        ca: fs.readFileSync(POSTGRES_CA).toString(),
      }
    : undefined,
  url: POSTGRES_URL,
});
