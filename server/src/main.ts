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
} from "./constants";
import { dataSource } from "./dataSource";
import { ActorResolver } from "./resolvers/actor.resolver";
import { SessionResolver } from "./resolvers/session.resolver";
import { ApolloContext } from "./types";
import { SessionCommentResolver } from "./resolvers/sessionComment.resolver";
import { loginDiscordClient } from "./discord/discordClient";
import { request } from "undici";
import { Discord } from "./entities/discord.entity";

const main = async () => {
  await dataSource.initialize();
  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:5173", "https://discord.com"],
      credentials: true,
    })
  );

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

  await loginDiscordClient();

  app.get("/discord-authorization", async (req, res) => {
    const frontendUrl = "http://localhost:5173";

    const discord = await Discord.findOne({
      where: { actorId: req.session.actorId },
    });

    console.log({ discord });

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
              redirect_uri: `http://localhost:4000/discord-authorization`,
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

        console.log(oauthData);

        const userResult = await request("https://discord.com/api/users/@me", {
          headers: {
            authorization: `${oauthData.token_type} ${oauthData.access_token}`,
          },
        });

        const userData = await userResult.body.json();

        console.log(userData);
        // if does not exist
        const created = await Discord.create({
          ...oauthData,
          actorId: req.session.actorId,
          userId: userData.id,
        }).save();
        console.log({ created });
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
*/
