import { ChannelType } from "discord.js";
import { DISCORD_CATEGORY_SESSIONS, DISCORD_GUILD_ID } from "../constants";
import { discordClient } from "./discordClient";

export interface CreateVoiceChannelProps {
  id: number;
  title: string;
}

export async function createVoiceChannel({
  id,
  title,
}: CreateVoiceChannelProps) {
  if (DISCORD_GUILD_ID === undefined) {
    console.error("DISCORD_GUILD_ID is undefined");
    return;
  }
  const guild = discordClient.guilds.cache.get(DISCORD_GUILD_ID);

  if (guild === undefined) {
    console.error("guild is undefined");
    return;
  }

  const channel = await guild.channels.create({
    name: `${title} #${id}`,
    type: ChannelType.GuildVoice,
    parent: DISCORD_CATEGORY_SESSIONS,
    position: 2,
  });

  const { code } = await guild.invites.create(channel, {});

  return { code };
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

// TODO: Make the voice channel created private, only users on a whitelist get in
// Or if that doesn't work, everyone with the link can join
