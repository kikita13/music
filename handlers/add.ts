import { Message } from "discord.js";
import { addedToQueue, checkOnLink } from "./helpers";
import { VoiceConnection } from "@discordjs/voice";
import { DatabaseManager } from "../db/client";
//Отрабатывает при *prefix*add text | url
export const addCommand = async (
  connect: VoiceConnection,
  message: Message,
  argument: string,
  links: string[],
  db: DatabaseManager,
) => {
  if (connect?.state.status !== "ready") return message.reply("Хуя ты чо придумал, я еще не в войсе даже");
  if(!message.guild) return;
  //Получаем ссылку
  const link = await checkOnLink(argument, links, message.guild.id, "add", db);
  //Пихаем ее в очередь
  await db.queue.add(message.guild?.id, link)
  //Пишем в чат что добавили
  message.reply(await addedToQueue(link));
};
