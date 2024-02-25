import { GuildConfig } from "./guildConfig";

export interface DBResponse {
  guild_id: string;
  data: GuildConfig;
}
