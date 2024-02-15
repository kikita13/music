import {
  channelOfMember,
  getCommandAndArgument,
  searchVideoURLs,
} from "./helpers/index";
import { ActivityType, Client, GatewayIntentBits } from "discord.js";
import { PREFIX } from "./consts";
import { connect, startCommand, stopCommand } from "./handlers";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once("ready", () => {
  client.user?.setActivity("Дёрни анус", { type: ActivityType.Custom });
});

client.on("messageCreate", async (message) => {
  //Проверка на наличие префикса
  if (!message.content.startsWith(PREFIX)) return;
  //Проверка, что сообщение пришло с сервера, а не с ЛС
  if (message.guild === null) return;
  //Получаем аргумент и команду
  const { argument, command } = getCommandAndArgument(message, PREFIX);
  //Список всех пользователей
  const members = await message.guild.members.fetch();
  //Получаем ссылки на найденные видео
  const links = await searchVideoURLs(argument);
  //Получаем голосовой канал, в котором находится разрешенный id
  const channel = channelOfMember(members);
  //Отрабатывает если команда была *prefix*play *text*
  if (command === "play") {
    //Проверка на то что это не ссылка
    if (!argument.startsWith("http")) {
      startCommand(channel, message, links[0]);
    } else {
      //А если ссылка, то ее и пихаем
      startCommand(channel, message, argument);
    }
  }
  //Отрабатывает при команде *prefix*stop
  if (command === "stop") {
    stopCommand(connect, message);
  }

  if (command === "add") {
  }
});

process.on('beforeExit', () => {
  client.destroy();
});

//Формирует клиент, принимает токен бота
client.login(process.env.BOT_TOKEN);
