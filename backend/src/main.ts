import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { Actor } from "./entities/actor.entity";
import { Session } from "./entities/session.entity";
import { SessionChat } from "./entities/sessionChat.entity";
import mikroOrmConfig from "./mikro-orm.config";
import * as dotenv from "dotenv";
import path from "path";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { SessionResolver } from "./resolvers/session.resolver";

dotenv.config({ path: path.resolve(__dirname + "../.env.local") });

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [SessionResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

main().catch((error) => {
  console.error(error);
});

// https://youtu.be/I6ypD7qv3Z8?t=4164
