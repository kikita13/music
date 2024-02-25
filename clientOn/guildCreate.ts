import { Guild } from "discord.js";
import { DatabaseManager } from "../db/client";

export const guildCreate = async (guild: Guild, db: DatabaseManager) => {
  const members = await guild.members.fetch();
  //Фильтруем участников, чтобы получить только администраторов
  const administrators = members.filter((member) =>
    member.permissions.has("Administrator")
  );
  //Получаем массив идентификаторов администраторов
  const administratorIds = administrators.map((admin) => admin.id);
  //Пихаем в базу новый канал
  await db.addDefaultConfig(guild.id, {
    prefix: "!",
    administrators: [...administratorIds],
    ids_for_bot_use: [],
    queue: [],
  });
};
