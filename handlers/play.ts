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
import { DatabaseManager } from "../db/client";

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
  argument: string,
  db: DatabaseManager
) => {
  //Проверяем есть разрешенный id в голосовом чате
  if (!channelOfMember) return message.reply("В войс зайди заебал");
  if (!message.guild) return;
  //Подключаемся к нему
  connection(await channelOfMember);
  //Получаем id канала
  const guildId = message.guild.id;
  //Получаем ссылку
  const link = await checkOnLink(argument, links, guildId, "play", db);
  //Получаем очередь
  let queue = await db.queue.get(message.guild.id);
  if (connect) {
    //Если бот подключился то начинает играть
    try {
      player = createAudioPlayer();
      //Выход из голосового канала после завершения проигрывания или следующий трек
      player.on(AudioPlayerStatus.Idle, async () => {
        queue = await db.queue.get(guildId);

        if (queue && queue.length == 0) {
          connect.destroy();
        } else {
          getNextResource(player, message, guildId, db);
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

export const getNextResource = async (
  player: AudioPlayer,
  message: Message,
  guildId: string,
  db: DatabaseManager
) => {
  const streamLink = await db.queue.next(guildId);

  if (!streamLink) return;

  const stream = await play.stream(streamLink);

  const resource = createAudioResource(stream.stream, {
    inputType: stream.type,
  });

  player.play(resource);

  connect.subscribe(player);

  message.channel.send(await nowPlaying(streamLink));
};
