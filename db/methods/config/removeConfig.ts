import { Client } from "pg";
import { TABLE_NAME } from "../../consts";

export const removeConfig = async (db: Client, guildId: string) => {
  try {
    const result = await db.query(
      `DELETE FROM ${TABLE_NAME} WHERE guild_id = $1`,
      [guildId]
    );
    return true;
  } catch (error) {
    console.error("Ошибка при удалении конфига из базы данных:", error);
    return false;
  }
};
