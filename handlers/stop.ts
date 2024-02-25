import { VoiceConnection } from "@discordjs/voice";
import { Message } from "discord.js";
import { DatabaseManager } from "../db/client";

//Выполняется при команде *prefix*stop
export const stopCommand = async (
  connect: VoiceConnection,
  message: Message,
  db: DatabaseManager
) => {
  if (!message.guild) return;

  await db.clearQueue(message.guild.id);

  if (connect.state.status === "ready") {
    connect.destroy();
  } else {
    //Если бот не в голосовом чате
    message.reply("Ээээ бля, я еще не начал даже");
  }
};
