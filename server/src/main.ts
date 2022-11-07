import "reflect-metadata";
import * as dotenv from "dotenv";
import path from "path";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { ActorResolver } from "./resolvers/actor.resolver";
import { SessionResolver } from "./resolvers/session.resolver";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { ApolloContext } from "./types";
import cors from "cors";
import { cookieName, isProduction } from "./constants";
import { dataSource } from "./dataSource";

dotenv.config({ path: path.resolve(__dirname + "../.env.local") });

const main = async () => {
  await dataSource.initialize();

  const app = express();

  app.use(cors({ origin: "http://localhost:5173", credentials: true }));

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  const tenYearsInMs = 1000 * 60 * 60 * 24 * 365 * 10;

  app.use(
    session({
      name: cookieName,
      store: new RedisStore({
        client: redis,
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
    context: ({ req, res }): ApolloContext => ({ req, res, redis }),
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

/*
 https://youtu.be/I6ypD7qv3Z8?t=24610
 Skipping SSR for now
 TODOs:
  - Add spinner for loading synchronous server requests
  - Styling
*/
