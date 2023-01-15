export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const SESSION_SECRET = process.env.SESSION_SECRET;

export const ENCRYPT_SECRET = process.env.ENCRYPT_SECRET;

export const POSTGRES_USERNAME = process.env.POSTGRESQL_USERNAME;
export const POSTGRES_PASSWORD = process.env.POSTGRESQL_PASSWORD;
export const POSTGRES_HOST = process.env.POSTGRESQL_HOST;
export const POSTGRES_PORT = process.env.POSTGRESQL_PORT
  ? parseInt(process.env.POSTGRESQL_PORT)
  : undefined;
export const POSTGRES_USE_SSL = process.env.POSTGRESQL_SSL === "true";

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

export const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;
export const DISCORD_CATEGORY_SESSIONS = process.env.DISCORD_CATEGORY_SESSIONS;

export const DISCORD_URL = "https://discord.gg/";

export const COOKIE_NAME = "qid";

export const FORGOT_PASSWORD_PREFIX = "forgot-password";
