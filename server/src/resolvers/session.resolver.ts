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

enum TimeStatus {
  PAST = "PAST",
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
}

@InputType()
class SessionInput {
  @Field()
  title: string;
  @Field()
  text: string;
  @Field()
  start: Date;
  @Field()
  stop: Date;
  @Field()
  attendeeLimit: number;
  @Field()
  isRemote: boolean;
  @Field()
  location: string;
}

@ObjectType()
class PaginatedOngoingSessions {
  @Field(() => [Session])
  sessions: Session[];
  @Field()
  hasMore: boolean;
}

@ObjectType()
class PaginatedUpcomingSessions {
  @Field(() => [Session])
  sessions: Session[];
  @Field()
  hasMore: boolean;
}

@ObjectType()
class PaginatedPastSessions {
  @Field(() => [Session])
  sessions: Session[];
  @Field()
  hasMore: boolean;
}

@Resolver(Session)
export class SessionResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() { text }: Session) {
    return text.slice(0, 250).trim();
  }

  @FieldResolver(() => Boolean)
  hasMoreText(@Root() { text }: Session) {
    return text.length > 250 + 1;
  }

  @FieldResolver(() => Int)
  async numberOfAttendees(@Root() { id }: Session) {
    const [, numberOfAttendees] = await ActorSession.findAndCount({
      where: { sessionId: id, actorIsPartOfSession: true },
    });
    return numberOfAttendees;
  }

  @FieldResolver(() => Boolean)
  async actorIsPartOfSession(
    @Root() { id }: Session,
    @Ctx() { req }: ApolloContext
  ) {
    if (!req.session.actorId) {
      return false;
    }

    const actorSession = await ActorSession.findOne({
      where: { sessionId: id, actorId: req.session.actorId },
    });

    if (!actorSession) {
      return false;
    }
    return actorSession.actorIsPartOfSession;
  }

  @FieldResolver(() => String)
  timeStatus(@Root() { start: startDate, stop: stopDate }: Session) {
    const currentDate = new Date();

    if (currentDate > stopDate) {
      return TimeStatus.PAST;
    }

    if (currentDate < startDate) {
      return TimeStatus.UPCOMING;
    }
    return TimeStatus.ONGOING;
  }

  @Query(() => PaginatedOngoingSessions)
  async ongoingSessions(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedOngoingSessions> {
    const replacements: (number | Date)[] = [];

    replacements.push(new Date());

    const realLimit = Math.min(25, limit);
    const realLimitPlusOne = realLimit + 1;

    replacements.push(realLimitPlusOne);

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
      where s."stop" > $1 and s."start" < $1
      ${cursor ? `and s."start" < $3` : ``}
      order by s."start" DESC
      limit $2
      `,
      replacements
    );
    // TODO: fix edge case where I am requesting more with cursor and the last
    // and next session both have the same starting time (I don't get the next session)
    return {
      sessions: sessions.slice(0, realLimit),
      hasMore: sessions.length === realLimitPlusOne,
    };
  }

  @Query(() => PaginatedUpcomingSessions)
  async upcomingSessions(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedUpcomingSessions> {
    const replacements: (number | Date)[] = [];

    replacements.push(new Date());

    const realLimit = Math.min(25, limit);
    const realLimitPlusOne = realLimit + 1;

    replacements.push(realLimitPlusOne);

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
      where s."start" > $1
      ${cursor ? `and s."start" > $3` : ``}
      order by s."start" ASC
      limit $2
      `,
      replacements
    );
    // TODO: fix edge case where I am requesting more with cursor and the last
    // and next session both have the same starting time (I don't get the next session)
    return {
      sessions: sessions.slice(0, realLimit),
      hasMore: sessions.length === realLimitPlusOne,
    };
  }

  @Query(() => PaginatedPastSessions)
  async pastSessions(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPastSessions> {
    const replacements: (number | Date)[] = [];

    replacements.push(new Date());

    const realLimit = Math.min(25, limit);
    const realLimitPlusOne = realLimit + 1;

    replacements.push(realLimitPlusOne);

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
      where s."stop" < $1
      ${cursor ? `and s."start" < $3` : ""}
      order by s."start" DESC
      limit $2
      `,
      replacements
    );
    // TODO: fix edge case where I am requesting more with cursor and the last
    // and next session both have the same starting time (I don't get the next session)
    return {
      sessions: sessions.slice(0, realLimit),
      hasMore: sessions.length === realLimitPlusOne,
    };
  }

  @Query(() => Session, { nullable: true })
  async session(@Arg("id", () => Int) id: number) {
    return await dataSource
      .createQueryBuilder()
      .select("session")
      .from(Session, "session")
      .leftJoinAndSelect("session.creator", "actor")
      .where("session.id = :id", { id: id })
      .getOne();
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

    await ActorSession.create({
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
    await ActorSession.delete({
      sessionId: id,
    });
    await Session.delete({
      id,
      creatorId: req.session.actorId,
    });
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
