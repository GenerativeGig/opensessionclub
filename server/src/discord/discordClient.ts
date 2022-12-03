import { Client, GatewayIntentBits } from "discord.js";
import { DISCORD_TOKEN } from "../constants";

export const discordClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildInvites],
});

export async function loginDiscordClient() {
  try {
    await discordClient.login(DISCORD_TOKEN);
  } catch {
    throw new Error("failed to login with discord client");
  }
}
