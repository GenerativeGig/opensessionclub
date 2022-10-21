import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { Session } from "../entities/session.entity";
import { ApolloContext } from "../types";

@Resolver()
export class SessionResolver {
  @Query(() => [Session])
  sessions(@Ctx() { em }: ApolloContext): Promise<Session[]> {
    return em.find(Session, {});
  }

  @Query(() => Session, { nullable: true })
  session(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: ApolloContext
  ): Promise<Session | null> {
    return em.findOne(Session, { id });
  }

  @Mutation(() => Session)
  async createSession(
    @Arg("title", () => String) title: string,
    @Ctx() { em }: ApolloContext
  ): Promise<Session> {
    const session = em.create(Session, { title });
    await em.persistAndFlush(session);
    return session;
  }

  @Mutation(() => Session)
  async updateSession(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String) title: string,
    @Ctx() { em }: ApolloContext
  ): Promise<Session | null> {
    const session = await em.findOne(Session, { id });
    if (!session) {
      return null;
    }
    if (typeof title !== "undefined") {
      session.title = title;
      await em.persistAndFlush(session);
    }
    return session;
  }

  @Mutation(() => Boolean)
  async deleteSession(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: ApolloContext
  ): Promise<boolean> {
    await em.nativeDelete(Session, { id });
    return true;
  }
}
