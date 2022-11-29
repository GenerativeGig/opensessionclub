import { ActorSession } from "../entities/actorSession.entity";
import { SessionComment } from "../entities/sessionComment.entity";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { ApolloContext } from "../types";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

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
    return await SessionComment.find({ where: { sessionId } });
  }

  @Mutation(() => SessionComment)
  @UseMiddleware(isAuthenticated)
  async createSessionComment(
    @Arg("text", () => String) text: string,
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
    return await SessionComment.create({
      text,
      sessionId,
      creatorId: req.session.actorId,
    }).save();
  }

  @Mutation(() => SessionComment)
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

    const { raw } = await SessionComment.update({ id }, { text });

    return raw[0];
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

// TODO: If you had comments on session but left, can you still see your comments?
// You get the chance to delete your comments on your profile, even comments of session you are not part of

// TODO: text formatting: comments and session text

// TODO: Integrate Discord
