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
  sessions(): Promise<Session[]> {
    return Session.find();
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
