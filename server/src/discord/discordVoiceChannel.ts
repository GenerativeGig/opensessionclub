import {
  ChannelType,
  PermissionFlagsBits,
  ThreadAutoArchiveDuration,
} from "discord.js";
import { DISCORD_CATEGORY_SESSIONS, DISCORD_GUILD_ID } from "../constants";
import { discordClient } from "./discordClient";

export interface CreateVoiceChannelProps {
  sessionId: number;
  title: string;
}

function getGuild() {
  if (DISCORD_GUILD_ID === undefined) {
    console.error("DISCORD_GUILD_ID is undefined");
    return;
  }

  return discordClient.guilds.cache.get(DISCORD_GUILD_ID);
}

export async function createVoiceChannel({
  sessionId,
  title,
}: CreateVoiceChannelProps) {
  // get creators discord user id NO
  // Only create the discord voice channel here with none being able to view it (except for admins DO LATER)
  // Then link to the discord voice channel in the session
  // If someone leaves the session, remove them from the allowed users
  const guild = getGuild();

  if (guild === undefined) {
    console.error("guild is undefined");
    return;
  }

  const everyoneRole = guild.roles.everyone;

  const channel = await guild.channels.create({
    name: `${title} #${sessionId}`,
    type: ChannelType.GuildVoice,
    parent: DISCORD_CATEGORY_SESSIONS,
    permissionOverwrites: [
      {
        type: 0,
        id: everyoneRole.id,
        deny: [
          PermissionFlagsBits.CreateInstantInvite,
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.Connect,
        ],
      },
    ],
    defaultAutoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
  });

  return await guild.invites.create(channel, { maxAge: 0 });
}

export async function deleteVoiceChannel(voiceChannelId: string) {
  const guild = getGuild();

  if (guild === undefined) {
    console.error("guild is undefined");
    return;
  }

  // TODO: Return DiscordResult -> error / success

  try {
    await guild.channels.delete(voiceChannelId);
  } catch (error) {
    console.error(error);
  }
}

export async function joinVoiceChannel(
  discordUserId: string,
  voiceChannelId: string
) {
  const guild = getGuild();

  if (guild === undefined) {
    console.error("guild is undefined");
    return;
  }
  const voiceChannel = guild.channels.cache.get(voiceChannelId);

  if (voiceChannel === undefined) {
    console.log("voiceChannel is undefined");
    return;
  }

  const everyoneRole = guild.roles.everyone;

  await voiceChannel.edit({
    permissionOverwrites: [
      {
        type: 0,
        id: everyoneRole.id,
        deny: [
          PermissionFlagsBits.CreateInstantInvite,
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.Connect,
        ],
      },
      {
        type: 1,
        id: discordUserId,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect],
      },
    ],
  });
}

export async function leaveVoiceChannel(
  discordUserId: string,
  voiceChannelId: string
) {
  const guild = getGuild();

  if (guild === undefined) {
    console.error("guild is undefined");
    return;
  }

  const voiceChannel = guild.channels.cache.get(voiceChannelId);

  if (voiceChannel === undefined) {
    console.log("voiceChannel is undefined");
    return;
  }

  await voiceChannel.edit({
    permissionOverwrites: [
      {
        type: 1,
        id: discordUserId,
        deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect],
      },
    ],
  });
}
// Post message in discord channel #sessions 15 before and when starting
// TODO: Message users 15 before session starts
// Save the discord ids for users as they click the link to join the voice chat (optional)
// This ID is used to send notifications in discord when session is starting in 15 and when it is
// actually starting, consider same for email (user can toggle these in notification settings)

// Link to voice chat room from each session details page
// Link to the discord channel in general from the welcome page and
// If the user has no related discord ID after creating or joining a session
// -> Display dialog inviting the person to the discord channel

// Use Graphql subscriptions with Server Sent Events (SSE) to send a notification to a user (session starting (in 15 min))
// How to trigger the event? node-schedule? or is there a safer way. what happens if server goes down?
// Use croner
