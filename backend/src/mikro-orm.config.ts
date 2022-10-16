import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { production } from "./constants";
import { Session } from "./entities/session.entity";

export default {
  user: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Session],
  dbName: "open",
  type: "postgresql",
  debug: !production,
  allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];
