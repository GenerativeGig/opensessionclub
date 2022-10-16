import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { Session } from "./entities/session.entity";
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
  const dotenv = await import("dotenv");
  dotenv.config({ path: path.resolve(__dirname + "../.env.local") });
  const orm = await MikroORM.init(mikroOrmConfig);

  const session = orm.em.create(Session, { title: "my session" });
  await orm.em.persistAndFlush(session);
};

main();

// video: 23:20
