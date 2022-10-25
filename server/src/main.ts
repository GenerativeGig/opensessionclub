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
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { ActorResolver } from "./resolvers/actor.resolver";
import { SessionResolver } from "./resolvers/session.resolver";
import * as redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { ApolloContext } from "./types";
import cors from "cors";
import { cookieName, isProduction } from "./constants";

dotenv.config({ path: path.resolve(__dirname + "../.env.local") });

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();

  app.use(cors({ origin: "http://localhost:5173", credentials: true }));

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({ legacyMode: true });
  await redisClient.connect();

  const tenYearsInMs = 1000 * 60 * 60 * 24 * 365 * 10;

  app.use(
    session({
      name: cookieName,
      store: new RedisStore({
        client: redisClient as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: tenYearsInMs,
        httpOnly: true,
        sameSite: "lax",
        secure: isProduction,
      },
      saveUninitialized: false,
      secret: "asdfasdjfaimkldlfkgmkl", // env
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema: await buildSchema({
      resolvers: [ActorResolver, SessionResolver],
      validate: false,
    }),
    context: ({ req, res }): ApolloContext => ({ em: orm.em, req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

main().catch((error) => {
  console.error(error);
});

// https://youtu.be/I6ypD7qv3Z8?t=11813
