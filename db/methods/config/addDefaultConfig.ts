import { Client } from "pg";
import { GuildConfig } from "../../models";
import { TABLE_NAME } from "../../consts";

export const addDefaultConfig = async (
  db: Client,
  guildId: string,
  defaultConfig: GuildConfig
) => {
  try {
    const result = await db.query(
      `INSERT INTO ${TABLE_NAME} (guild_id, data) VALUES ($1, $2)`,
      [guildId, defaultConfig]
    );
    return true;
  } catch (error) {
    console.error(
      "Ошибка при добавлении дефолтного конфига в базу данных:",
      error
    );
    return false;
  }
};
