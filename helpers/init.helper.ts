import { Client, GatewayIntentBits, Message } from "discord.js";
import { getCommandAndArgument } from "./command.helper";
import { searchVideoURLs } from "./video.helper";
import { channelOfMember } from "./channel.helper";
import { getPrefix } from "../handlers/helpers";
import { DatabaseManager } from "../db/client";

export const getInitialState = async (
  message: Message,
  db: DatabaseManager
) => {
  //Проверка, что сообщение пришло с сервера, а не с ЛС
  if (message.guild === null) return;
  //Получаем префик сервера
  const prefix = (await getPrefix(message, db)) as string;
  //Проверка на наличие префикса
  if (!message.content.startsWith(prefix)) return undefined;
  //Получаем аргумент и команду
  const { argument, command } = getCommandAndArgument(message, prefix);
  //Список всех пользователей
  const members = await message.guild.members.fetch();
  //Получаем ссылки на найденные видео
  const links = await searchVideoURLs(argument);
  //Получаем голосовой канал, в котором находится разрешенный id
  const channel = channelOfMember(members, message, db);

  return { argument, channel, links, command };
};
//Формируем клиент с нужными интентами
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
};
