import { Client } from "pg";
import { TABLE_NAME } from "../../consts";

export const clearQueue = async (db: Client, guildId: string) => {
  try {
    await db.query(
      `UPDATE ${TABLE_NAME} SET data = jsonb_set(data, $1, $2) WHERE guild_id = $3`,
      ["{queue}", "[]", guildId]
    );
    return true;
  } catch (error) {
    console.error("Ошибка при очистке очереди в базе данных:", error);
    return false;
  }
};
