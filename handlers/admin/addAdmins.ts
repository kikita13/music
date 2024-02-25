import { Message } from "discord.js";
import { DatabaseManager } from "../../db/client";

export const addAdminsCommand = async (message: Message, argument: string, db: DatabaseManager) => {
  if (!message.guild) return;

  await db.addAdminId(message.guild.id, argument);

  message.reply(argument + ' добавлен в список администраторов')
}