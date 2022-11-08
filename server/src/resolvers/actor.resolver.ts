import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Actor } from "../entities/actor.entity";
import { ApolloContext } from "../types";
import argon2 from "argon2";
import { cookieName, forgotPasswordPrefix } from "../constants";
import { validateSignup } from "../validation/signup.validation";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { dataSource } from "../dataSource";

@ObjectType()
class FieldError {
  @Field(() => String)
  field: string;

  @Field(() => String)
  message: string;
}

@ObjectType()
class ActorResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Actor, { nullable: true })
  actor?: Actor;
}

@Resolver(Actor)
export class ActorResolver {
  @FieldResolver(() => String)
  email(@Root() actor: Actor, @Ctx() { req }: ApolloContext) {
    if (req.session.actorId === actor.id) {
      return actor.email;
    }
    return "";
  }

  @Query(() => Actor, { nullable: true })
  me(@Ctx() { req }: ApolloContext) {
    if (!req.session.actorId) {
      return null;
    }
    return Actor.findOne({ where: { id: req.session.actorId } });
  }

  @Mutation(() => ActorResponse)
  async signup(
    @Arg("name", () => String) name: string,
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Ctx() { req }: ApolloContext
  ): Promise<ActorResponse> {
    const errors = validateSignup(name, email, password);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(password);

    let actor;
    try {
      const result = await dataSource
        .createQueryBuilder()
        .insert()
        .into(Actor)
        .values({
          name,
          lowerCaseName: name.toLowerCase(),
          email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();
      actor = result.raw[0];
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [{ field: "name", message: "name is already taken" }],
        };
      }
    }

    req.session.actorId = actor.id;

    return { actor };
  }

  @Mutation(() => ActorResponse)
  async login(
    @Arg("nameOrEmail", () => String) nameOrEmail: string,
    @Arg("password", () => String) password: string,
    @Ctx() { req }: ApolloContext
  ): Promise<ActorResponse> {
    const actor = await Actor.findOne(
      nameOrEmail.includes("@")
        ? { where: { email: nameOrEmail } }
        : { where: { lowerCaseName: nameOrEmail.toLowerCase() } }
    );
    if (!actor) {
      return {
        errors: [
          { field: "nameOrEmail", message: "name or email doesn't exist" },
        ],
      };
    }
    const valid = await argon2.verify(actor.password, password);
    if (!valid) {
      return {
        errors: [{ field: "password", message: "password is incorrect" }],
      };
    }

    req.session.actorId = actor.id;

    return {
      actor,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: ApolloContext) {
    return new Promise((resolve) =>
      req.session.destroy((error) => {
        res.clearCookie(cookieName);
        if (error) {
          console.log(error);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email", () => String) email: string,
    @Ctx() { redis }: ApolloContext
  ) {
    const actor = await Actor.findOne({ where: { email } });
    if (!actor) {
      return true;
    }

    const token = v4();

    const threeDaysInMs = 1000 * 60 * 60 * 24 * 3;

    await redis.set(
      forgotPasswordPrefix + token,
      actor.id,
      "EX",
      threeDaysInMs
    );

    await sendEmail(
      email,
      `<a href="http://localhost:5173/change-password/${token}">reset password</a>`
    );

    return true;
  }

  @Mutation(() => ActorResponse)
  async changePassword(
    @Arg("token", () => String) token: string,
    @Arg("newPassword", () => String) newPassword: string,
    @Ctx() { redis, req }: ApolloContext
  ): Promise<ActorResponse> {
    if (newPassword.length <= 7) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "password has to be at least 8 characters long",
          },
        ],
      };
    }

    const key = forgotPasswordPrefix + token;

    const actorId = await redis.get(key);
    if (!actorId) {
      return {
        errors: [
          {
            field: "token",
            message: "token is expired",
          },
        ],
      };
    }

    const actorIdNumber = parseInt(actorId);
    const actor = await Actor.findOne({ where: { id: actorIdNumber } });

    if (!actor) {
      return {
        errors: [
          {
            field: "token",
            message: "user does not exist",
          },
        ],
      };
    }

    await Actor.update(
      { id: actorIdNumber },
      { password: await argon2.hash(newPassword) }
    );

    await redis.del(key);

    // Log in actor after changing password
    req.session.actorId = actor.id;

    return { actor };
  }
}
