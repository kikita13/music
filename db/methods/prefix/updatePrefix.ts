import { Client } from "pg";
import { TABLE_NAME } from "../../consts";

export const updatePrefix = async (
  db: Client,
  guildId: string,
  newPrefix: string
) => {
  try {
    //Выполняем запрос на обновление префикса
    const result = await db.query(
      `UPDATE ${TABLE_NAME} SET data = jsonb_set(data, $1, $2) WHERE guild_id = $3`,
      ["{prefix}", `"${newPrefix}"`, guildId]
    );
    return true; //Возвращаем true при успешном обновлении
  } catch (error) {
    console.error("Ошибка при обновлении префикса:", error);
    return false; //Возвращаем false при возникновении ошибки
  }
};
