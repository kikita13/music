import { Client } from "pg";
import { getAdminIds } from "./getAdminIds";
import { TABLE_NAME } from "../../consts";

export const addAdminId = async (
  db: Client,
  guildId: string,
  adminId: string
) => {
  try {
    const current = await getAdminIds(db, guildId);
    if (current) {
      const adminIds = [...current, adminId];
      await db.query(
        `UPDATE ${TABLE_NAME} SET data = jsonb_set(data, $1, $2, true) WHERE guild_id = $3`,
        ["{administrators}", JSON.stringify(adminIds), guildId]
      );
    }

    return true;
  } catch (error) {
    console.error(
      "Ошибка при добавлении ids администраторов в базу данных:",
      error
    );

    return false;
  }
};
