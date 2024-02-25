import { Client } from "pg";
import { GuildConfig } from "../../models";
import { TABLE_NAME } from "../../consts";

export const updateConfig = async (
  db: Client,
  guildId: string,
  newData: GuildConfig
) => {
  try {
    const result = await db.query(
      `INSERT INTO ${TABLE_NAME} (guild_id, data) VALUES ($1, $2) ON CONFLICT (guild_id) DO UPDATE SET data = $2`,
      [guildId, newData]
    );
    return true; //Возвращаем true при успешном обновлении данных
  } catch (error) {
    console.error("Ошибка при обновлении данных в базе данных:", error);
    return false; //Возвращаем false при возникновении ошибки
  }
};
