import { Client } from "pg";
import { TABLE_NAME } from "../../consts";

export const getPrefix = async (db: Client, guildId: string) => {
  try {
    //Выполняем запрос к базе данных для получения данных
    const result = await db.query(
      `SELECT data FROM ${TABLE_NAME} WHERE guild_id = $1`,
      [guildId]
    );
    if (result.rows.length > 0) {
      //Если данные найдены, извлекаем JSON из столбца "data"
      const jsonData = result.rows[0].data;
      const prefix = jsonData.prefix;
      return prefix;
    } else {
      //Если данных не найдено, возвращаем null
      return null;
    }
  } catch (error) {
    console.error("Ошибка при получении префикса из базы данных:", error);
    return null;
  }
};
