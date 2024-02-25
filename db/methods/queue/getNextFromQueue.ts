import { Client } from "pg";
import { TABLE_NAME } from "../../consts";

export const getNextFromQueue = async (db: Client, guildId: string) => {
  try {
    const result = await db.query(
      `SELECT data FROM ${TABLE_NAME} WHERE guild_id = $1`,
      [guildId]
    );
    if (result.rows.length > 0) {
      const config = result.rows[0];
      const queue = config.data.queue;
      if (queue.length > 0) {
        const firstItem = queue.shift() as string;
        await db.query(
          `UPDATE ${TABLE_NAME} SET data = jsonb_set(data, $1, $2) WHERE guild_id = $3`,
          ["{queue}", JSON.stringify(queue), guildId]
        );
        return firstItem;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      "Ошибка при получении и удалении элемента из очереди в базе данных:",
      error
    );
    return null;
  }
};
