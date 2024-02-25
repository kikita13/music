import { Message } from "discord.js";
import { getPrefix } from "./helpers";
import { DatabaseManager } from "../db/client";
//Пишет в чат какие команды есть у бота
export const helpCommand = async (message: Message, db: DatabaseManager) => {
  //Получаем префикс сервера
  const prefix = (await getPrefix(message, db)) as string;
  //Пишем в чат
  message.reply(`Команды бота следующие крч: 

**${prefix}play** (название трека | ссылка | ссылка на плейлист) - начинает петь, а ты чего ожидал?;
**${prefix}add** (название трека | ссылка) - добавляет в очередь;
**${prefix}queue** - показывает чо есть в очереди;
**${prefix}clear** - чистит очередь полностью;
**${prefix}stop** - прекращает петь;
**${prefix}shuffle** - шафалит очередь;
**${prefix}skip** - пропускает трек;`);
};
