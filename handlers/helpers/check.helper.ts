import { DatabaseManager } from "../../db/client";
import { addPlayListToQueue } from "./video.helper";
//Проверяет аргумент на наличие ссылки
export const checkOnLink = async (
  argument: string,
  links: string[],
  guildId: string,
  command: string,
  db: DatabaseManager
) => {
  //Если начинается с http то
  return argument.startsWith("http")
    ? argument.includes("&list=") //Если это плейлист
      ? await addPlayListToQueue(argument, command, guildId, db)
      : argument
    : links[0];
};
