import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  VoiceConnection,
  AudioPlayerStatus,
  AudioPlayer,
} from "@discordjs/voice";
import { Message, VoiceBasedChannel } from "discord.js";
import play from "play-dl";
import { checkOnLink, nowPlaying } from "./helpers";
import { QUEUE } from "../consts/queue";

export let connect: VoiceConnection;
export let player: AudioPlayer;

//Формирует коннект и подключаемся к голосовому чату
export const connection = (channelOfMember: VoiceBasedChannel) => {
  connect = joinVoiceChannel({
    channelId: channelOfMember.id,
    guildId: channelOfMember.guild.id,
    adapterCreator: channelOfMember.guild.voiceAdapterCreator,
  });
};

//Выполняется при команде *prefix*play *текст*
export const playCommand = async (
  channelOfMember: VoiceBasedChannel,
  message: Message,
  links: string[],
  argument: string
) => {
  // Проверяем есть разрешенный id в голосовом чате
  if (!channelOfMember) return message.reply("В войс зайди заебал");
  //Подключаемся к нему
  connection(channelOfMember);
  //Получаем ссылку
  const link = await checkOnLink(argument, links);

  if (connect) {
    //Если бот подключился то начинает играть
    try {
      player = createAudioPlayer();
      // Выход из голосового канала после завершения проигрывания или следующий трек
      player.on(AudioPlayerStatus.Idle, () => {
        if (QUEUE.length === 0) {
          connect.destroy();
        } else {
          getNextResource(player, message);
        }
      });

      const stream = await play.stream(link);
      const resource = createAudioResource(stream.stream, {
        inputType: stream.type,
      });

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

export const getNextResource = async (player: AudioPlayer, message: Message) => {
  const streamLink = QUEUE.shift()

  if (!streamLink) return;

  const stream = await play.stream(streamLink);

  const resource = createAudioResource(stream.stream, {
    inputType: stream.type,
  });

  player.play(resource);

  connect.subscribe(player);

  message.channel.send(await nowPlaying(streamLink));
}
