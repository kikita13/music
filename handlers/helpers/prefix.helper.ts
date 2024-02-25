import { Message } from "discord.js";
import { DatabaseManager } from "../../db/client";

export const getPrefix = async (message: Message, db: DatabaseManager) => {
  //Проверка, что сообщение пришло с сервера, а не с ЛС
  if (message.guild === null) return;
  const prefix = await db.getPrefix(message.guild.id);
  //Возвращаем префикс сервера
  return prefix;
};
