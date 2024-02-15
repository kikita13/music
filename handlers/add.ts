import { Message } from "discord.js";
import { addedToQueue, checkOnLink } from "./helpers";
import { QUEUE } from "../consts/queue";
import { VoiceConnection } from "@discordjs/voice";

export const addCommand = async (
  connect: VoiceConnection,
  message: Message,
  argument: string,
  links: string[]
) => {
  if (connect?.state.status !== 'ready') return message.reply("Хуя ты чо придумал, я еще не в войсе даже");

  const link = checkOnLink(argument, links);

  QUEUE.push(link);

  message.reply(await addedToQueue(link));
};
