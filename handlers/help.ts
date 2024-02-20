import { Message } from "discord.js";
import { PREFIX } from "../consts";
//Пишет в чат какие команды есть у бота
export const helpCommand = (message: Message) => {
  message.reply(`Команды бота следующие крч: 

**${PREFIX}play** (название трека | ссылка | ссылка на плейлист) - начинает петь, а ты чего ожидал?;
**${PREFIX}add** (название трека | ссылка) - добавляет в очередь;
**${PREFIX}queue** - показывает чо есть в очереди;
**${PREFIX}stop** - прекращает петь;
**${PREFIX}shuffle** - шафалит очередь;
**${PREFIX}skip** - пропускает трек;`);
};
