import { Message } from "discord.js";
import { addedToQueue, checkOnLink } from "./helpers";
import { QUEUE } from "../consts/queue";
import { VoiceConnection } from "@discordjs/voice";
//Отрабатывает при *prefix*add text | url
export const addCommand = async (
  connect: VoiceConnection,
  message: Message,
  argument: string,
  links: string[]
) => {
  if (connect?.state.status !== 'ready') return message.reply("Хуя ты чо придумал, я еще не в войсе даже");
  //Получаем ссылку
  const link = await checkOnLink(argument, links);
  //Пихаем ее в очередь
  QUEUE.push(link);
  //Пишем в чат что добавили
  message.reply(await addedToQueue(link));
};
