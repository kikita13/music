import { Message } from "discord.js";
import { VoiceConnection } from "@discordjs/voice";
import { videoInfo } from "./helpers";
import { DatabaseManager } from "../db/client";
//Отрабатывает при *prefix*queue
export const queueCommand = async (
  connect: VoiceConnection,
  message: Message,
  db: DatabaseManager,
) => {
  if (connect?.state.status !== "ready") return message.reply("Хуя ты чо придумал, я еще не в войсе даже");
  if (!message.guild) return;
  //Получаем очередь
  const queue = await db.queue.get(message.guild.id);
  //Если очередь пустая
  if (!queue || queue.length === 0) return message.reply(`В очереди нет треков`);
  //Получаем первые 10 элементов
  const firstTenTracks = [...queue].slice(0, 10);
  //Получаем массив промисов с инфо о видео
  const queueInfoPromises = firstTenTracks.map(
    async (item, index) => `${index + 1} - ${await videoInfo(item)}`
  );
  const queueInfo = await Promise.all(queueInfoPromises);
  //Пишем первые 10 треков в очереди
  message.reply({ content: queueInfo.join("\n"), embeds: [] });
};
