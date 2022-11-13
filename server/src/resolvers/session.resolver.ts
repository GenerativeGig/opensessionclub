import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { dataSource } from "../dataSource";
import { ActorSession } from "../entities/actorSession.entity";
import { Session } from "../entities/session.entity";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { ApolloContext } from "../types";

@InputType()
class SessionInput {
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

@ObjectType()
class PaginatedSessions {
  @Field(() => [Session])
  sessions: Session[];
  @Field()
  hasMore: boolean;
}

@Resolver(Session)
export class SessionResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Session) {
    return root.text.slice(0, 250);
  }

  @FieldResolver(() => Boolean)
  hasMoreText(@Root() root: Session) {
    return root.text.length > 250 + 1;
  }

  @FieldResolver(() => Int)
  async numberOfAttendees(@Root() root: Session) {
    const [, numberOfAttendees] = await ActorSession.findAndCount({
      where: { sessionId: root.id, actorIsPartOfSession: true },
    });
    return numberOfAttendees;
  }

  @FieldResolver(() => Boolean)
  async actorIsPartOfSession(
    @Root() root: Session,
    @Ctx() { req }: ApolloContext
  ) {
    if (!req.session.actorId) {
      return false;
    }

    const actorSession = await ActorSession.findOne({
      where: { sessionId: root.id, actorId: req.session.actorId },
    });

    if (!actorSession) {
      return false;
    }
    return actorSession.actorIsPartOfSession;
  }

  // might rename sessions to paginatedSessions to make the frontend code a bit more readable
  // i.e. data.paginatedSessions.sessions instead of sessions.sessions
  @Query(() => PaginatedSessions)
  async sessions(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedSessions> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: (number | Date)[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const sessions = await dataSource.query(
      `
      select s.*,
      json_build_object(
        'id', a.id,
        'name', a.name,
        'email', a.email,
        'createdAt', a."createdAt",
        'updatedAt', a."updatedAt"
        ) creator
      from session s
      inner join public.actor a on a.id = s."creatorId"
      ${cursor ? `where s."createdAt" < $2` : ""}
      order by s."createdAt" DESC
      limit $1
      `,
      replacements
    );

    return {
      sessions: sessions.slice(0, realLimit),
      hasMore: sessions.length === realLimitPlusOne,
    };
  }

  @Query(() => Session, { nullable: true })
  session(@Arg("id", () => Int) id: number) {
    return Session.findOne({ where: { id } });
  }

  @Mutation(() => Session)
  @UseMiddleware(isAuthenticated)
  async createSession(
    @Arg("input") input: SessionInput,
    @Ctx() { req }: ApolloContext
  ) {
    const session = await Session.create({
      ...input,
      creatorId: req.session.actorId,
    }).save();

    ActorSession.create({
      sessionId: session.id,
      actorId: req.session.actorId,
      actorIsPartOfSession: true,
    }).save();

    return session;
  }

  @Mutation(() => Session)
  @UseMiddleware(isAuthenticated)
  async updateSession(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: SessionInput,
    @Ctx() { req }: ApolloContext
  ) {
    const session = await Session.findOne({
      where: { id, creatorId: req.session.actorId },
    });

    if (!session) {
      return null;
    }

    await Session.update({ id }, { ...input });

    return session;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteSession(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: ApolloContext
  ) {
    await Session.delete({ id, creatorId: req.session.actorId });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async joinSession(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: ApolloContext
  ) {
    const session = await Session.findOne({ where: { id } });

    if (!session) {
      return false;
    }

    if ((await this.numberOfAttendees(session)) >= session.attendeeLimit) {
      return false;
    }

    const actorSession = await ActorSession.findOne({
      where: { sessionId: id, actorId: req.session.actorId },
    });

    if (!actorSession) {
      ActorSession.create({
        sessionId: id,
        actorId: req.session.actorId,
        actorIsPartOfSession: true,
      }).save();
    } else {
      await ActorSession.update(
        { sessionId: id, actorId: req.session.actorId },
        { actorIsPartOfSession: true }
      );
    }
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async leaveSession(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: ApolloContext
  ) {
    const session = await Session.findOne({ where: { id } });

    if (session?.creatorId === req.session.actorId) {
      return false;
    }

    const actorSession = await ActorSession.findOne({
      where: { sessionId: id, actorId: req.session.actorId },
    });

    if (!actorSession) {
      return false;
    }

    await ActorSession.update(
      { sessionId: id, actorId: req.session.actorId },
      { actorIsPartOfSession: false }
    );
    return true;
  }
}
