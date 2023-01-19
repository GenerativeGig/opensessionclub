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
import {
  COOKIE_NAME,
  SESSION_SECRET,
  IS_PRODUCTION,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  REDIS_PASSWORD,
} from "./constants";
import { dataSource } from "./dataSource";
import { ActorResolver } from "./resolvers/actor.resolver";
import { SessionResolver } from "./resolvers/session.resolver";
import { ApolloContext } from "./types";
import { SessionCommentResolver } from "./resolvers/sessionComment.resolver";
import { loginDiscordClient } from "./discord/discordClient";
import { request } from "undici";
import { Discord } from "./entities/discord.entity";
import { encrypt } from "./utils/Crypto";

const main = async () => {
  await dataSource.initialize();
  const app = express();

  app.use(
    cors({
      origin: IS_PRODUCTION
        ? "https://opensession.club"
        : [
            "http://localhost:5173",
            "http://localhost:4173",
            "https://discord.com",
          ],
      credentials: true,
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { createClient } = require("redis");
  const redisClient = createClient({ legacyMode: true });
  redisClient.on("connect", () => console.log("Connected to Redis!"));
  redisClient.on("error", (err: Error) =>
    console.log("Redis Client Error", err)
  );
  redisClient.connect();

  const RedisStore = connectRedis(session);
  console.log("const RedisStore = connectRedis(session);", { RedisStore });
  const redis = new Redis({ password: REDIS_PASSWORD });
  console.log("const redis = new Redis({ password: REDIS_PASSWORD });", {
    redis,
  });

  if (!SESSION_SECRET) {
    throw new Error("missing session secret");
  }

  const redisStore = new RedisStore({
    client: redisClient,
    disableTouch: true,
  });
  console.log(
    "const redisStore = new RedisStore({ client: redis, disableTouch: true });",
    { redisStore }
  );

  console.log(COOKIE_NAME);

  const tenYearsInMs = 1000 * 60 * 60 * 24 * 365 * 10;

  const sessionInstance = session({
    proxy: IS_PRODUCTION ? true : undefined,
    name: COOKIE_NAME,
    store: redisStore,
    cookie: {
      domain: IS_PRODUCTION ? "opensession.club" : undefined,
      maxAge: tenYearsInMs,
      httpOnly: true,
      sameSite: "lax",
      secure: IS_PRODUCTION,
    },
    saveUninitialized: false,
    secret: SESSION_SECRET,
    resave: false,
  });
  console.log({ sessionInstance });

  if (IS_PRODUCTION) {
    app.set("trust proxy", 1);
  }

  app.use(sessionInstance);

  const apolloServer = new ApolloServer({
    plugins: IS_PRODUCTION
      ? undefined
      : [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema: await buildSchema({
      resolvers: [ActorResolver, SessionResolver, SessionCommentResolver],
      validate: false,
    }),
    context: ({ req, res }): ApolloContext => ({ req, res, redis }),
    cache: "bounded",
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  await loginDiscordClient();

  app.get("/discord-authorization", async (req, res) => {
    const frontendUrl = IS_PRODUCTION
      ? "https://opensession.club"
      : "http://localhost:5173";

    const discord = await Discord.findOne({
      where: { actorId: req.session.actorId },
    });
    // TODO: If discord is there but the token is expired? Then I have to use refresh_token
    // if it is not yet expired
    // TEST: What happens if I change the contents of token / refresh_token?
    // SEEMS OK RIGHT NOW, KEEP AN EYE ON THIS
    if (discord) {
      /*

      TODO: If I need to do more than get the discord user id,
            right now I save it once and can invite the actor to a voice channel

      const currentDate = new Date();
      const expiryDate = new Date(
        discord.updatedAt.getMilliseconds() + discord.expires_in
      );
      if (currentDate < expiryDate && discord.access_token) {
        // we don't necessarily have to refresh token
        // but if it still fails -> then do refresh it
      }
      // if does not work to use the saved discord fields then request it again
      */
    } else {
      if (DISCORD_CLIENT_ID === undefined) {
        console.error("DISCORD_CLIENT_SECRET is undefined");
        // TODO: Redirect errors to error page
        res.redirect(frontendUrl);
        return;
      }

      if (DISCORD_CLIENT_SECRET === undefined) {
        console.error("DISCORD_CLIENT_SECRET is undefined");
        return false;
      }

      const { code } = req.query;

      if (code === undefined) {
        console.error("code is undefined");
        res.redirect(frontendUrl);
        return;
      }

      if (typeof code !== "string") {
        console.error("code is not a string");
        res.redirect(frontendUrl);
        return;
      }

      try {
        const tokenResponseData = await request(
          "https://discord.com/api/oauth2/token",
          {
            method: "POST",
            body: new URLSearchParams({
              client_id: DISCORD_CLIENT_ID,
              code,
              client_secret: DISCORD_CLIENT_SECRET,
              grant_type: "authorization_code",
              redirect_uri: IS_PRODUCTION
                ? "https://opensession.club/discord-authorization"
                : "http://localhost:4000/discord-authorization",
              scope: "identify",
            }).toString(),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (tokenResponseData.statusCode === 401) {
          console.error("unauthorized");
          res.redirect(frontendUrl);
          return;
        }

        const oauthData = await tokenResponseData.body.json();

        const userResult = await request("https://discord.com/api/users/@me", {
          headers: {
            authorization: `${oauthData.token_type} ${oauthData.access_token}`,
          },
        });

        const userData = await userResult.body.json();

        await Discord.create({
          ...oauthData,
          access_token: encrypt(oauthData.access_token),
          refresh_token: encrypt(oauthData.refresh_token),
          actorId: req.session.actorId,
          userId: userData.id,
        }).save();
      } catch (error) {
        console.error(error);
        res.redirect(frontendUrl);
        return;
      }
    }

    res.redirect(frontendUrl);
    return;
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
  - Improve client side caching? -> only update the data when needed, right now I am loading anew for each
    request, even for the same data "navigate(0)"
  
  Change of tech:
  - Use Nest.js
  - Use pnpm

  Updates of major versions:
  - React Router to v6
  - Vite to v4
*/
