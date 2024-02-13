import { Message } from "discord.js";

//Форматирует сообщение, отделяя команду и аргументы
export const getCommandAndArgument = (message: Message, prefix: string) => {
  const command = message.content.replace(prefix, "").split(" ")[0];
  const argument = message.content.replace(`${prefix}${command}`, "").trim();

  return { command, argument };
};
