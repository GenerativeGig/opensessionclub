import { MikroORM } from "@mikro-orm/core";
import { Actor } from "./entities/actor.entity";
import { Session } from "./entities/session.entity";
import { SessionChat } from "./entities/sessionChat.entity";
import mikroOrmConfig from "./mikro-orm.config";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname + "../.env.local") });

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);

  const session = orm.em.create(Session, {
    title: "my session",
  });
  await orm.em.persistAndFlush(session);

  const sessions = await orm.em.find(Session, {});
  console.log(sessions);
};

main().catch((error) => {
  console.error(error);
});

// video: 39:50
