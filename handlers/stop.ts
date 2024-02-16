import { VoiceConnection } from "@discordjs/voice";
import { Message } from "discord.js";
import { QUEUE } from "../consts/queue";

//Выполняется при команде *prefix*stop
export const stopCommand = (
  connect: VoiceConnection,
  message: Message
) => {
  QUEUE.splice(0, QUEUE.length);
  
  if (connect.state.status === 'ready') {
    connect.destroy();
  } else {
    //Если бот не в голосовом чате
    message.reply("Ээээ бля, я еще не начал даже");
  }
};
