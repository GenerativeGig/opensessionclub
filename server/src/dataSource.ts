import { postgresPassword, postgresUsername } from "./constants";
import { Actor } from "./entities/actor.entity";
import { Session } from "./entities/session.entity";
import { DataSource } from "typeorm";

export const dataSource: DataSource = new DataSource({
  entities: [Actor, Session],
  username: postgresUsername,
  password: postgresPassword,
  database: "open",
  type: "postgres",
  logging: true,
  synchronize: true,
});
