import { Message } from "discord.js"
import { QUEUE } from "../consts/queue"
import { VoiceConnection } from "@discordjs/voice";
import { videoInfo } from "./helpers";
//Отрабатывает при *prefix*queue
export const queueCommand = async (connect: VoiceConnection, message: Message) => {
  if (connect?.state.status !== 'ready') return message.reply("Хуя ты чо придумал, я еще не в войсе даже");
  //Если очередь пустая
  if (QUEUE.length === 0) return message.reply(`В очереди нет треков`);
  //Получаем первые 10 элементов
  const firstTenTracks = [...QUEUE].slice(0, 10);
  //Получаем массив промисов с инфо о видео
  const queueInfoPromises = firstTenTracks.map(async (item, index) => `${index + 1} - ${await videoInfo(item)}`);
  const queueInfo = await Promise.all(queueInfoPromises);
  //Пишем первые 10 треков в очереди
  message.reply({content: queueInfo.join('\n'), embeds: []});
}