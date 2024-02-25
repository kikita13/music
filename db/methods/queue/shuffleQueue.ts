import { Client } from "pg";
import { getQueue } from "./getQueue";
import { TABLE_NAME } from "../../consts";

const shuffleArray = (array: string[]) => {
  const copy = [...array];

  copy.sort(() => Math.random() - 0.5);

  return copy;
};

export const shuffleQueue = async (db: Client, guildId: string) => {
  try {
    //Получаем текущий список элементов в очереди
    const currentQueue = await getQueue(db, guildId);

    if (!currentQueue) {
      console.error("Не удалось получить текущую очередь из базы данных.");
      return false;
    }

    //Перемешиваем очередь
    const shuffledQueue = shuffleArray(currentQueue);

    //Обновляем данные в базе данных с новым перемешанным списком
    const success = await db.query(
      `UPDATE ${TABLE_NAME} SET data = jsonb_set(data, $1, $2) WHERE guild_id = $3`,
      ["{queue}", JSON.stringify(shuffledQueue), guildId]
    );

    if (success) {
      return true;
    } else {
      console.error(
        `Ошибка при обновлении очереди для сервера ${guildId} в базе данных.`
      );
      return false;
    }
  } catch (error) {
    console.error("Ошибка при перемешивании очереди в базе данных:", error);
    return false;
  }
};
