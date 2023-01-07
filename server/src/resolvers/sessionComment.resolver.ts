import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { dataSource } from "../dataSource";
import { ActorSession } from "../entities/actorSession.entity";
import { SessionComment } from "../entities/sessionComment.entity";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { ApolloContext } from "../types";

@Resolver(SessionComment)
export class SessionCommentResolver {
  @Query(() => [SessionComment], { nullable: true })
  @UseMiddleware(isAuthenticated)
  async sessionComments(
    @Arg("sessionId", () => Int) sessionId: number,
    @Ctx() { req }: ApolloContext
  ) {
    // TODO: Make this a middleware or something similar
    const actorSession = await ActorSession.findOne({
      where: { sessionId, actorId: req.session.actorId },
    });

    if (!actorSession) {
      // TODO: return error not part of session
      return null;
    }

    return await dataSource
      .createQueryBuilder()
      .select("sessionComment")
      .from(SessionComment, "sessionComment")
      .leftJoinAndSelect("sessionComment.creator", "actor")
      .where("sessionComment.sessionId = :sessionId", { sessionId })
      .orderBy("sessionComment.createdAt", "DESC")
      .getMany();
  }

  @Mutation(() => SessionComment)
  async createSessionComment(
    @Arg("sessionId", () => Int) sessionId: number,
    @Arg("text", () => String) text: string,
    @Ctx() { req }: ApolloContext
  ) {
    // TODO: Make this a middleware or something similar
    const actorSession = await ActorSession.findOne({
      where: { sessionId, actorId: req.session.actorId },
    });

    if (!actorSession) {
      // TODO: return error not part of session
      return null;
    }

    return await SessionComment.create({
      text,
      sessionId,
      creatorId: req.session.actorId,
    }).save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async updateSessionComment(
    @Arg("id", () => Int) id: number,
    @Arg("text", () => String) text: string,
    @Ctx() { req }: ApolloContext
  ) {
    const sessionComment = await SessionComment.findOne({
      where: { id, creatorId: req.session.actorId },
    });

    if (!sessionComment) {
      return null;
    }

    await SessionComment.update({ id }, { text });

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteSessionComment(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: ApolloContext
  ) {
    await SessionComment.delete({ id, creatorId: req.session.actorId });

    return true;
  }
}

// TODO MUST LATER: If you had comments on session but left, can you still see your comments?
// You get the chance to delete your comments on your profile, even comments of session you are not part of
// On your profile be able to delete and edit your comments / go to corresponding session
// on your profile show a list of all my sessions and session comments?
