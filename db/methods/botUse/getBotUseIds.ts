import { Client } from "pg";
import { TABLE_NAME } from "../../consts";

export const getBotUseIds = async (db: Client, guildId: string) => {
  try {
    const result = await db.query(
      `SELECT data FROM ${TABLE_NAME} WHERE guild_id = $1`,
      [guildId]
    );
    if (result.rows.length > 0) {
      const config = result.rows[0];
      return config.data.ids_for_bot_use;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Ошибка при получении ids bot use из базы данных:", error);
    return null;
  }
};
