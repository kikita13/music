export interface GuildConfigAttributes {
  guild_id: string;
  prefix: string[];
  ids_for_bot_use: string[];
  administrators: string[];
  queue: string[];
}