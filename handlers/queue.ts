import { Message } from "discord.js"
import { QUEUE } from "../consts/queue"
import { VoiceConnection } from "@discordjs/voice";
import { videoInfo } from "./helpers";

export const queueCommand = async (connect: VoiceConnection, message: Message) => {
  if (connect?.state.status !== 'ready') return message.reply("Хуя ты чо придумал, я еще не в войсе даже");

  if (QUEUE.length === 0) return message.reply(`В очереди нет треков`);

  const queueInfoPromises = QUEUE.map(async (item, index) => `${index + 1} - ${await videoInfo(item)}`);
  const queueInfo = await Promise.all(queueInfoPromises);

  message.reply(queueInfo.join('\n'));
}