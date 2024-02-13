import { VoiceConnection } from "@discordjs/voice";
import { Message } from "discord.js";

//Выполняется при команде *prefix*stop
export const stopCommand = (
  connect: VoiceConnection | undefined,
  message: Message
) => {
  if (connect?.state.status === 'ready') {
    connect.destroy();
  } else {
    //Если бот не в голосовом чате
    message.reply("Ээээ бля, я еще не начал даже");
  }
};
