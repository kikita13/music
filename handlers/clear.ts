import { Message } from "discord.js";
import { QUEUE } from "../consts/queue";

export const clearCommand = (message: Message) => {
  QUEUE.splice(0, QUEUE.length);

  message.reply('Очистил очередь')
};
