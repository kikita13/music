import { Message } from "discord.js";
import { getNextResource, player } from "./play";
import { DatabaseManager } from "../db/client";

//Выполняется при команде *prefix*skip
export const skipCommand = async (message: Message, db: DatabaseManager) => {
  if (!message.guild) return;

  const guildId = message.guild.id;

  await getNextResource(player, message, guildId, db);
};
