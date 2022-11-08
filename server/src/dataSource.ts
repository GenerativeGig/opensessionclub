import { postgresPassword, postgresUsername } from "./constants";
import { Actor } from "./entities/actor.entity";
import { Session } from "./entities/session.entity";
import { DataSource } from "typeorm";
import path from "path";

export const dataSource: DataSource = new DataSource({
  entities: [Actor, Session],
  migrations: [path.join(__dirname, "./migrations/*")],
  username: postgresUsername,
  password: postgresPassword,
  database: "open",
  type: "postgres",
  logging: true,
  synchronize: true,
});
