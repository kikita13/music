import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  VoiceConnection,
  AudioPlayerStatus,
} from "@discordjs/voice";
import { Message, VoiceBasedChannel } from "discord.js";
import play from "play-dl";
import { nowPlaying } from "./helpers";

export let connect: VoiceConnection

//Формирует коннект и подключаемся к голосовому чату
export const connection = (channelOfMember: VoiceBasedChannel) => {
  connect =  joinVoiceChannel({
    channelId: channelOfMember.id,
    guildId: channelOfMember.guild.id,
    adapterCreator: channelOfMember.guild.voiceAdapterCreator,
  });
};

//Выполняется при команде *prefix*start *текст*
export const startCommand = async (
  channelOfMember: VoiceBasedChannel,
  message: Message,
  link: string
) => {
  // Проверяем есть разрешенный id в голосовом чате
  if (!channelOfMember) return message.reply("В войс зайди заебал");
  connection(channelOfMember);

  if (connect) {
    //Если бот подключился то начинает играть
    try {
      const player = createAudioPlayer();
      // Выход из голосового канала после завершения проигрывания
      player.on(AudioPlayerStatus.Idle, () => {
        connect.destroy(); 
    });

      const stream = await play.stream(link);
      const resource = createAudioResource(stream.stream, {inputType: stream.type});

      player.play(resource);

      connect.subscribe(player);
      //Пишет в чат что сейчас играет
      message.reply(await nowPlaying(link));
    } catch {
      message.reply("Хуйню какую-то написал, даже читать не буду");
    }
  } else {
    //Если не может подключиться
    message.reply("Ля, чет зайти не могу");
  }
};
