import { Query } from "../db/enums/confiColumn";
import {
  Collection,
  GuildMember,
  Message,
  VoiceBasedChannel,
} from "discord.js";
import { DatabaseManager } from "../db/client";

//Возвращает объект канала к которому подключен разрешенный id
export const channelOfMember = async (
  members: Collection<string, GuildMember>,
  message: Message,
  db: DatabaseManager
) => {
  if (!message.guild) return;

  const isWebhook = message.author.bot;

  const ids_for_bot_use = (await db.get(
    Query.botUse,
    message.guild.id
  )) as string[];
  //Если автор сообщения это бот то канал первого из разрешенных пользователей, если не бот то того кто написал
  const channel = isWebhook
    ? (members.find((user) => ids_for_bot_use.find((id) => user.user.id === id))
        ?.voice.channel as VoiceBasedChannel)
    : (members.find((user) => user.id === message.author.id)?.voice
        .channel as VoiceBasedChannel);

  return channel;
};
