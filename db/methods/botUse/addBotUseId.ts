import { Client } from "pg";
import { getBotUseIds } from "./getBotUseIds";
import { TABLE_NAME } from "../../consts";

export const addBotUseId = async (
  db: Client,
  guildId: string,
  botUseId: string
) => {
  try {
    const current = await getBotUseIds(db, guildId);
    if (current) {
      const botUseIds = [...current, botUseId];
      await db.query(
        `UPDATE ${TABLE_NAME} SET data = jsonb_set(data, $1, $2, true) WHERE guild_id = $3`,
        ["{ids_for_bot_use}", JSON.stringify(botUseIds), guildId]
      );
    }

    return true;
  } catch (error) {
    console.error("Ошибка при добавлении ids bot use в базу данных:", error);
    return false;
  }
};
