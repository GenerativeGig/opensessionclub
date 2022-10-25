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
    @Arg("password", () => String) password: string,
    @Ctx() { em, req }: ApolloContext
  ): Promise<ActorResponse> {
    if (name.length <= 2) {
      return {
        errors: [
          {
            field: "name",
            message: "name has to be at least 3 characters long",
          },
        ],
      };
    }

    if (password.length <= 7) {
      return {
        errors: [
          {
            field: "password",
            message: "password has to be at least 8 characters long",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(password);
    const newActor = em.create(Actor, {
      name,
      lowerCaseName: name.toLowerCase(),
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
    @Arg("name", () => String) name: string,
    @Arg("password", () => String) password: string,
    @Ctx() { em, req }: ApolloContext
  ): Promise<ActorResponse> {
    const actor = await em.findOne(Actor, {
      lowerCaseName: name.toLowerCase(),
    });
    if (!actor) {
      return {
        errors: [{ field: "name", message: "name doesn't exist" }],
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
}
