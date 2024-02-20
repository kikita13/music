import {
  Collection,
  GuildMember,
  Message,
  VoiceBasedChannel,
} from "discord.js";
import { ALLOWED_IDS } from "../consts";

//Возвращает объект канала к которому подключен разрешенный id
export const channelOfMember = (
  members: Collection<string, GuildMember>,
  message: Message,
): VoiceBasedChannel => {
  const isWebhook = message.author.bot
  //Если автор сообщения это бот то канал первого из разрешенных пользователей, если не бот то того кто написал
  const channel = isWebhook
    ? members.find((user) => ALLOWED_IDS.find((id) => user.user.id === id))?.voice.channel as VoiceBasedChannel
    : members.find(user => user.id === message.author.id)?.voice.channel as VoiceBasedChannel

  return channel;
}
