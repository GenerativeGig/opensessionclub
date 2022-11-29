// Setup dotenv before importing from "./constants"
import dotenv from "dotenv";
dotenv.config();

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, SESSION_SECRET, IS_PRODUCTION } from "./constants";
import { dataSource } from "./dataSource";
import { ActorResolver } from "./resolvers/actor.resolver";
import { SessionResolver } from "./resolvers/session.resolver";
import { ApolloContext } from "./types";
import { SessionCommentResolver } from "./resolvers/sessionComment.resolver";
// import { Session } from "./entities/session.entity";
// import { ActorSession } from "./entities/actorSession.entity";

const main = async () => {
  await dataSource.initialize();
  // await dataSource.runMigrations();
  // await ActorSession.delete({});
  // await Session.delete({});
  const app = express();

  app.use(cors({ origin: "http://localhost:5173", credentials: true }));

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  const tenYearsInMs = 1000 * 60 * 60 * 24 * 365 * 10;

  if (!SESSION_SECRET) {
    throw new Error("missing session secret");
  }

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: tenYearsInMs,
        httpOnly: true,
        sameSite: "lax",
        secure: IS_PRODUCTION,
      },
      saveUninitialized: false,
      secret: SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema: await buildSchema({
      resolvers: [ActorResolver, SessionResolver, SessionCommentResolver],
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
 TODO:
  - Add spinner for loading synchronous server requests
  - Styling
  - Add client side caching -> only update the data when needed, right now I am loading anew for each
    request, even for the same data "navigate(0)"
*/
