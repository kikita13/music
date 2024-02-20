import { Message } from "discord.js";

//Форматирует сообщение, отделяя команду и аргументы
export const getCommandAndArgument = (message: Message, prefix: string) => {
  //Получаем команду
  const command = message.content.replace(prefix, "").split(" ")[0];
  //Получаем аргументы команды
  const argument = message.content.replace(`${prefix}${command}`, "").trim();
  //Возвращаем их
  return { command, argument };
};
