import { dataSource } from "../dataSource";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Session } from "../entities/session.entity";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { ApolloContext } from "../types";

@InputType()
class SessionOptions {
  @Field()
  title: string;
  @Field()
  text: string;
  @Field()
  start: Date;
  @Field()
  end: Date;
  @Field()
  attendeeLimit: number;
}

@Resolver()
export class SessionResolver {
  @Query(() => [Session])
  async sessions(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<Session[]> {
    const realLimit = Math.min(50, limit);
    const queryBuilder = dataSource
      .getRepository(Session)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(realLimit);
    if (cursor) {
      queryBuilder.where('"createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }
    return queryBuilder.getMany();
  }

  @Query(() => Session, { nullable: true })
  session(@Arg("id", () => Int) id: number): Promise<Session | null> {
    return Session.findOne({ where: { id } });
  }

  @Mutation(() => Session)
  @UseMiddleware(isAuthenticated)
  async createSession(
    @Arg("options") options: SessionOptions,
    @Ctx() { req }: ApolloContext
  ): Promise<Session> {
    return Session.create({
      ...options,
      creatorId: req.session.actorId,
    }).save();
  }

  @Mutation(() => Session)
  async updateSession(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String) title: string
  ): Promise<Session | null> {
    const session = await Session.findOne({ where: { id } });
    if (!session) {
      return null;
    }
    if (typeof title !== "undefined") {
      await Session.update({ id }, { title });
    }
    return session;
  }

  @Mutation(() => Boolean)
  async deleteSession(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Session.delete(id);
    return true;
  }
}
