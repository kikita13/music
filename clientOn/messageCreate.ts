import { getInitialState } from "../helpers/index";
import {
  connect,
  playCommand,
  stopCommand,
  addCommand,
  queueCommand,
  helpCommand,
  skipCommand,
  shuffleCommand,
  clearCommand,
  setPrefixCommand,
} from "../handlers";
import { Message } from "discord.js";
import { DatabaseManager } from "../db/client";
import { addAdminsCommand, addBotUseCommand } from "../handlers/admin";

export const messageCreate = async (message: Message, db: DatabaseManager) => {
  //Получаем начальные данные
  const initialState = await getInitialState(message, db);
  //Если их нет, то прекращаем выполнение
  if (!initialState) return;
  //Деструктуризация
  const { argument, channel, links, command } = initialState;
  //Отрабатывает если команда была *prefix*play *text*
  if (command === "play") await playCommand(channel as any, message, links, argument, db);
  //Отрабатывает при команде *prefix*stop
  if (command === "stop") await stopCommand(connect, message, db);
  //Отрабатывает при команде *prefix*add *text*
  if (command === "add") await addCommand(connect, message, argument, links, db);
  //Отрабатывает при команде *prefix*queue
  if (command === "queue") await queueCommand(connect, message, db);
  //Отрабатывает при команде *prefix*help
  if (command === "help") await helpCommand(message, db);
  //Отрабатывает при команде *prefix*skip
  if (command === "skip") await skipCommand(message, db);
  //Отрабатывает при команде *prefix*shuffle
  if (command === "shuffle") await shuffleCommand(message, connect, db);
  //Отрабатывает при команде *prefix*clear
  if (command === "clear") await clearCommand(message, db);
  //Отрабатывает при команде *prefix*prefix
  if (command === "prefix") await setPrefixCommand(message, argument, db);
  //Отрабатывает при команде *prefix*addAdmin
  if (command === "addAdmin") await addAdminsCommand(message, argument, db);
  //Отрабатывает при команде *prefix*addBotUse
  if (command === "addBotUse") await addBotUseCommand(message, argument, db);
};
