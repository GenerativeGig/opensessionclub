import { MikroORM } from "@mikro-orm/core";
import { isProduction, postgresPassword, postgresUsername } from "./constants";
import path from "path";
import { Actor } from "./entities/actor.entity";
import { Session } from "./entities/session.entity";
import { SessionChat } from "./entities/sessionChat.entity";
import { SessionChatMessage } from "./entities/sessionChatMessage.entity";

export default {
  user: postgresUsername,
  password: postgresPassword,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Actor, Session],
  dbName: "open",
  type: "postgresql",
  debug: isProduction,
  allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];
