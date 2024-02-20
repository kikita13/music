import { Message } from "discord.js";
import { QUEUE } from "../consts/queue";
import { VoiceConnection } from "@discordjs/voice";

export const shuffleCommand = (message: Message, connect: VoiceConnection) => {
  if (connect?.state.status !== 'ready') return message.reply("Хуя ты чо придумал, я еще не в войсе даже");

  if (QUEUE.length === 0) return message.reply('Нечего шафалить');

  QUEUE.sort(() => Math.random() - 0.5);

  message.reply(`Пошафалил немного очередь`)
}