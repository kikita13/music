import { Guild } from "discord.js";
import { DatabaseManager } from "../db/client";

export const guildDelete = async (guild: Guild, db: DatabaseManager) => {
  await db.removeConfig(guild.id);
};
