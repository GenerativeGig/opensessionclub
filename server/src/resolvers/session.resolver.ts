import parse from "node-html-parser";
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
import { DISCORD_URL } from "../constants";
import { dataSource } from "../dataSource";
import {
  createVoiceChannel,
  deleteVoiceChannel,
  joinVoiceChannel,
  leaveVoiceChannel,
} from "../discord/discordVoiceChannel";
import { ActorSession } from "../entities/actorSession.entity";
import { Discord } from "../entities/discord.entity";
import { Session } from "../entities/session.entity";
import { SessionComment } from "../entities/sessionComment.entity";
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
  @Field({ nullable: true })
  text: string;
  @Field()
  start: Date;
  @Field()
  stop: Date;
  @Field()
  attendeeLimit: number;
  @Field()
  isRemote: boolean;
  @Field({ nullable: true })
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

function textSnippetHelper(text: string) {
  const textHTML = parse(text);

  const maxCharacterCount = 250;

  let textSnippet = "";
  let characterCount = 0;

  let hasMore = false;

  textHTML.childNodes.forEach((node, index) => {
    if (index >= 3) {
      hasMore = true;
      return;
    }

    if (node.text === "") {
      return;
    }

    if (characterCount + node.text.length > maxCharacterCount) {
      textSnippet += `<p>${node.text.slice(
        0,
        maxCharacterCount - characterCount
      )}</p>`;

      characterCount += node.text.slice(
        0,
        maxCharacterCount - characterCount
      ).length;

      hasMore = true;
      return;
    } else {
      textSnippet += node.toString();

      characterCount += node.text.length;
    }
  });
  return { textSnippet, hasMore };
}

@Resolver(Session)
export class SessionResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() { text }: Session) {
    return textSnippetHelper(text).textSnippet;
  }

  @FieldResolver(() => Boolean)
  hasMoreText(@Root() { text }: Session) {
    return textSnippetHelper(text).hasMore;
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

  /* @FieldResolver(() => Boolean)
  canCreate() {
    return true;
  }

  @FieldResolver(() => Boolean)
  canRead(@Ctx() { req }: ApolloContext) {
    return req.session.actorId !== undefined;
  }

  @FieldResolver(() => Boolean)
  canJoin(@Root() {creatorId}: Session, @Ctx() { req }: ApolloContext) {
    return true;
  }

  @FieldResolver(() => Boolean)
  canLeave(@Root() { creatorId }: Session, @Ctx() { req }: ApolloContext) {
    return creatorId !== req.session.actorId;
  }

  @FieldResolver(() => Boolean)
  canUpdate(@Root() {}: Session) {
    return true;
  }

  @FieldResolver(() => Boolean)
  canDelete(@Root() {}: Session) {
    return true;
  }

  @FieldResolver(() => Boolean)
  canCancel(@Root() {}: Session) {
    return true;
  }

  @FieldResolver(() => Boolean)
  canJoinVoiceChannel(@Root() {}: Session) {
    return true;
  } */

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
  @UseMiddleware(isAuthenticated)
  async session(@Arg("id", () => Int) id: number) {
    return await dataSource
      .createQueryBuilder()
      .select("session")
      .from(Session, "session")
      .leftJoinAndSelect("session.creator", "actor")
      .where("session.id = :id", { id })
      .getOne();
  }

  @Mutation(() => Boolean)
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

    if (session.isRemote) {
      // Create a job that sends a notification in discord (later also email) if the user has it on
      // 15 minutes before, exactly when it starts as well
      // save job somewhere to do clean up if
      // - session is deleted -> do nothing except cancel
      // - start time is changed -> create new job
      // - Remote is toggled -> also delete discord chat? (maybe people posted stuff there)
      // - attendee leaves session -> cancel job for the attendee (partial clean up)
      // TODO: Add Session state CANCELLED -> Then no notifications, except that it is cancelled
      // The creator can write a message to the attendees in this cancel notification
      /* const minutes = 15;
      const date = new Date(session.start.getTime() - minutes * 60000); */

      // Instead of a cron job add field resolvers for notifications?
      // If time is less than or equal to 15 minutes before a session
      // however if I am sending an email, this has to be a cron job
      // I have the data on the fronted, I can calculate there and just display a
      // span that says: "Session starting soon!" -> click to go to session details
      // when session is ongoing "Join Session now!" -> click to go to session details
      // double booking sessions? Allow this? Sure, which Session to show then?
      /* const job = new Cron(date, () => {
        // send email to creator 15 min before session starts
        // do same job when someone joins a session
      });
      console.log({ job }); */

      const voiceChannel = await createVoiceChannel({
        sessionId: session.id,
        title: session.title,
      });

      if (voiceChannel === undefined) {
        console.error(
          "voiceChannel is undefined, session is created without a voice channel"
        );
        return;
      }

      if (voiceChannel.channelId === null) {
        console.error(
          "voiceChannel.channelId is undefined, session is created without a voice channel"
        );
        return;
      }

      await Session.update(
        { id: session.id },
        {
          voiceChannelId: voiceChannel.channelId,
          voiceChannelUrl: `${DISCORD_URL}${voiceChannel.code}`,
        }
      );
      // Don't use jobs for creating the discord channel, too much overhead.
      // Use it for notifications to being with
    }

    return true;
  }

  @Mutation(() => Boolean)
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
      return false;
    }

    if (session.isCancelled) {
      return false;
    }

    // TODO: if title changed -> change the discord voice channel title

    // TODO: if no longer remote -> delete voice channel and
    // if remote -> create voice channel

    await Session.update({ id }, { ...input });

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteSession(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: ApolloContext
  ) {
    // TODO: Auth (isCreator) as Middleware
    const session = await Session.findOne({ where: { id } });

    if (!session) {
      return false;
    }

    if (session?.creatorId !== req.session.actorId) {
      return false;
    }

    await SessionComment.delete({
      sessionId: id,
    });

    await ActorSession.delete({
      sessionId: id,
    });

    await Session.delete({
      id,
      creatorId: req.session.actorId,
    });

    if (session.voiceChannelId) {
      deleteVoiceChannel(session.voiceChannelId);
    }

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async cancelSession(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: ApolloContext
  ) {
    // TODO: Auth (isCreator) as Middleware
    const session = await Session.findOne({ where: { id } });

    if (!session) {
      return false;
    }

    if (session?.isCancelled) {
      return false;
    }

    if (session?.creatorId !== req.session.actorId) {
      return false;
    }

    await Session.update(
      { id },
      {
        isCancelled: true,
        voiceChannelId: null,
        voiceChannelUrl: null,
      }
    );

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

    if (session.isCancelled) {
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

    if (!session) {
      console.error("Session does not exist");
      return false;
    }

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

    // TODO: leave discord voice channel
    const discord = await Discord.findOne({
      where: { actorId: req.session.actorId },
    });

    if (!discord || !session.voiceChannelId) {
      return true;
    }

    await leaveVoiceChannel(discord.userId, session.voiceChannelId);

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async joinSessionVoiceChannel(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: ApolloContext
  ) {
    // TODO: Make this a middleware or something similar
    const actorSession = await ActorSession.findOne({
      where: { sessionId: id, actorId: req.session.actorId },
    });

    if (!actorSession) {
      // TODO: return error not part of session
      return false;
    }

    const discord = await Discord.findOne({
      where: { actorId: req.session.actorId },
    });

    if (!discord) {
      console.log("redirect discord auth");
      // TODO: Create exact return object
      return false;
    }

    const session = await Session.findOneBy({ id });

    if (!session) {
      console.log("session null");
      return false;
    }

    if (!session?.voiceChannelId) {
      console.log("voiceChannelId null");
      return false;
    }

    await joinVoiceChannel(discord.userId, session.voiceChannelId);

    console.log("redirect voiceChannelUrl");
    return true;
  }
}
