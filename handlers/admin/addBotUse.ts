import { Message } from "discord.js";
import { DatabaseManager } from "../../db/client";

export const addBotUseCommand = async (
  message: Message,
  argument: string,
  db: DatabaseManager
) => {
  if (!message.guild) return;

  await db.addBotUseId(message.guild.id, argument);

  message.reply(argument + " добавлен в список для использования ботов");
};
