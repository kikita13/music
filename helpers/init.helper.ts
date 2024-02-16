import { Client, GatewayIntentBits, Message } from "discord.js";
import { getCommandAndArgument } from "./command.helper";
import { PREFIX } from "../consts";
import { searchVideoURLs } from "./video.helper";
import { channelOfMember } from "./channel.helper";

export const getInitialState = async (message: Message) => {
  //Проверка на наличие префикса
  if (!message.content.startsWith(PREFIX)) return undefined;
  //Проверка, что сообщение пришло с сервера, а не с ЛС
  if (message.guild === null) return;
  //Получаем аргумент и команду
  const { argument, command } = getCommandAndArgument(message, PREFIX);
  //Список всех пользователей
  const members = await message.guild.members.fetch();
  //Получаем ссылки на найденные видео
  const links = await searchVideoURLs(argument);
  //Получаем голосовой канал, в котором находится разрешенный id
  const channel = channelOfMember(members, message);

  return {argument, channel, links, command}
}

export const getClient = () => {
  return new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildVoiceStates,
    ],
  });
}