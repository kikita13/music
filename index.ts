import { getClient, getInitialState } from "./helpers/index";
import { ActivityType } from "discord.js";
import { connect, startCommand, stopCommand, addCommand, queueCommand, helpCommand } from "./handlers";

const client = getClient();
//Устанавливаем статус боту
client.once("ready", () => {
  client.user?.setActivity("Дёрни анус", { type: ActivityType.Custom });
});
//Реагирует на сообщение
client.on("messageCreate", async (message) => {
  //Получаем начальные данные
  const initialState = await getInitialState(message);
  //Если их нет, то прекращаем выполнение
  if (!initialState) return;
  //Деструктуризация
  const { argument, channel, links, command } = initialState;
  //Отрабатывает если команда была *prefix*play *text*
  if (command === "play") startCommand(channel, message, links, argument);
  //Отрабатывает при команде *prefix*stop
  if (command === "stop") stopCommand(connect, message);
  //Отрабатывает при команде *prefix*add *text*
  if (command === "add") addCommand(connect, message, argument, links);
  //Отрабатывает при команде *prefix*queue
  if (command === "queue") queueCommand(connect, message);  
  //Отрабатывает при команде *prefix*help
  if (command === "help") helpCommand(message);
});

process.on("beforeExit", () => {
  client.destroy();
});

//Формирует клиент, принимает токен бота
client.login(process.env.BOT_TOKEN);
