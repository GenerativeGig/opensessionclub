import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Actor } from "../entities/actor.entity";
import { ApolloContext } from "../types";
import argon2 from "argon2";
import { cookieName } from "../constants";
import { validateSignup } from "../validation/signup.validation";
import { sendEmail } from "../utils/sendEmail";

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

@Resolver()
export class ActorResolver {
  @Query(() => Actor, { nullable: true })
  async me(@Ctx() { em, req }: ApolloContext) {
    if (!req.session.actorId) {
      return null;
    }
    const actor = em.findOne(Actor, { id: req.session.actorId });
    return actor;
  }

  @Mutation(() => ActorResponse)
  async signup(
    @Arg("name", () => String) name: string,
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Ctx() { em, req }: ApolloContext
  ): Promise<ActorResponse> {
    const errors = validateSignup(name, email, password);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(password);
    const newActor = em.create(Actor, {
      name,
      lowerCaseName: name.toLowerCase(),
      email,
      password: hashedPassword,
    });

    try {
      await em.persistAndFlush(newActor);
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [{ field: "name", message: "name is already taken" }],
        };
      }
    }

    req.session.actorId = newActor.id;

    return { actor: newActor };
  }

  @Mutation(() => ActorResponse)
  async login(
    @Arg("nameOrEmail", () => String) nameOrEmail: string,
    @Arg("password", () => String) password: string,
    @Ctx() { em, req }: ApolloContext
  ): Promise<ActorResponse> {
    const actor = await em.findOne(
      Actor,
      nameOrEmail.includes("@")
        ? { email: nameOrEmail }
        : { lowerCaseName: nameOrEmail.toLowerCase() }
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
    @Ctx() { em }: ApolloContext
  ) {
    const user = await em.findOne(Actor, { email });
    if (!user) {
      return true;
    }

    await sendEmail(email, "");

    return true;
  }
}
