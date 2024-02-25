import { Client } from "pg";
import { getQueue } from "./getQueue";
import { TABLE_NAME } from "../../consts";

export const addToQueue = async (
  db: Client,
  guildId: string,
  item: string | string[]
) => {
  try {
    //Проверяем, является ли item строкой или массивом
    const newItem = Array.isArray(item) ? item : [item];

    //Получаем текущий список элементов в очереди
    const currentQueue = await getQueue(db, guildId);

    if (!currentQueue) {
      console.error("Не удалось получить текущую очередь из базы данных.");
      return false;
    }

    //Объединяем текущую очередь с новыми элементами
    const updatedQueue = [...currentQueue, ...newItem];

    //Обновляем данные в базе данных с новым списком
    await db.query(
      `UPDATE ${TABLE_NAME} SET data = jsonb_set(data, $1, $2) WHERE guild_id = $3`,
      ["{queue}", JSON.stringify(updatedQueue), guildId]
    );
    return true;
  } catch (error) {
    console.error(
      "Ошибка при добавлении элемента в очередь в базу данных:",
      error
    );
    return false;
  }
};
