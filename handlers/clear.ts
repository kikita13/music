import { Query } from "../db/enums/confiColumn";
import { Message } from "discord.js";
import { DatabaseManager } from "../db/client";

export const clearCommand = async (message: Message, db: DatabaseManager) => {
  if (!message.guild) return;

  await db.clear(Query.queue, message.guild.id);

  message.reply("Очистил очередь");
};
