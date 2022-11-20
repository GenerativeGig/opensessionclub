import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { v4 } from "uuid";
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../constants";
import { dataSource } from "../dataSource";
import { Actor } from "../entities/actor.entity";
import { ApolloContext } from "../types";
import { sendEmail } from "../utils/sendEmail";
import { validateSignup } from "../validation/signup.validation";

@ObjectType()
class ActorFieldError {
  @Field(() => String)
  field: string;

  @Field(() => String)
  message: string;
}

@ObjectType()
export class ActorResponse {
  @Field(() => [ActorFieldError], { nullable: true })
  errors?: ActorFieldError[];

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
  async actor(@Arg("id", () => Int) id: number) {
    return Actor.findOne({ where: { id } });
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
    const actor = await Actor.findOne({
      where: [
        { lowerCaseName: name.toLowerCase() },
        { lowerCaseEmail: email.toLowerCase() },
      ],
    });

    if (actor?.lowerCaseName === name.toLowerCase()) {
      return { errors: [{ field: "name", message: "name is already taken" }] };
    }

    if (actor?.lowerCaseEmail === email.toLowerCase()) {
      return {
        errors: [{ field: "email", message: "email is already taken" }],
      };
    }

    const errors = validateSignup(name, email, password);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(password);

    const result = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Actor)
      .values({
        name,
        lowerCaseName: name.toLowerCase(),
        email,
        lowerCaseEmail: email.toLowerCase(),
        password: hashedPassword,
      })
      .returning("*")
      .execute();

    const newActor = result.raw[0];

    // Log in actor
    req.session.actorId = newActor.id;

    return { actor: newActor };
  }

  @Mutation(() => ActorResponse)
  async login(
    @Arg("nameOrEmail", () => String) nameOrEmail: string,
    @Arg("password", () => String) password: string,
    @Ctx() { req }: ApolloContext
  ): Promise<ActorResponse> {
    const actor = await Actor.findOne(
      nameOrEmail.includes("@")
        ? { where: { lowerCaseEmail: nameOrEmail.toLowerCase() } }
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

    // Log in actor
    req.session.actorId = actor.id;

    return {
      actor,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: ApolloContext) {
    return new Promise((resolve) =>
      req.session.destroy((error) => {
        res.clearCookie(COOKIE_NAME);
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
      FORGOT_PASSWORD_PREFIX + token,
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

    const key = FORGOT_PASSWORD_PREFIX + token;

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

    // Log in actor
    req.session.actorId = actor.id;

    return { actor };
  }
}

// Trim name and email of spaces (end and beginning before saving them)
