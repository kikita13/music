import { Message } from "discord.js";
import { DatabaseManager } from "../../db/client";
import { Query } from "../../db/models";

export const addAdminsCommand = async (message: Message, argument: string, db: DatabaseManager) => {
  if (!message.guild) return;

  await db.add(Query.administrators, message.guild.id, argument);

  message.reply(argument + ' добавлен в список администраторов')
}