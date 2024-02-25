import { Message } from "discord.js";
import { VoiceConnection } from "@discordjs/voice";
import { DatabaseManager } from "../db/client";

export const shuffleCommand = async (
  message: Message,
  connect: VoiceConnection,
  db: DatabaseManager
) => {
  if (connect?.state.status !== "ready") return message.reply("Хуя ты чо придумал, я еще не в войсе даже");
  if (!message.guild) return;

  const queue = await db.queue.get(message.guild.id);

  if (!queue) return message.reply("Нечего шафалить");

  await db.queue.shuffle(message.guild.id);

  message.reply(`Пошафалил немного очередь`);
};
