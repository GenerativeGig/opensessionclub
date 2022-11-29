import { ActorSession } from "src/entities/actorSession.entity";
import { SessionComment } from "src/entities/sessionComment.entity";
import { isAuthenticated } from "src/middleware/isAuthenticated";
import { ApolloContext } from "src/types";
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
  @Query(() => [SessionComment])
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
    @Arg("text") text: string,
    @Arg("sessionId") sessionId: number,
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
    @Arg("id") id: number,
    @Arg("text") text: string,
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
