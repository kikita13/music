import { Client } from "pg";
import { TABLE_NAME } from "../../consts";

export const getConfig = async (db: Client, guildId: string) => {
  try {
    const result = await db.query(
      `SELECT data FROM ${TABLE_NAME} WHERE guild_id = $1`,
      [guildId]
    );
    if (result.rows.length > 0) {
      return result.rows[0].data; //Возвращаем первую найденную запись
    } else {
      return null; //Возвращаем null, если запись не найдена
    }
  } catch (error) {
    console.error("Ошибка при получении данных из базы данных:", error);
    return null;
  }
};
