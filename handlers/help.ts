import { Message } from "discord.js";
import { PREFIX } from "../consts";

export const helpCommand = (message: Message) => {
  message.reply(`Команды бота следующие крч: 

**${PREFIX}start** (название трека | ссылка) - начинает петь, а ты чего ожидал?;
**${PREFIX}stop** - прекращает петь;
**${PREFIX}add** (название трека | ссылка) - добавляет в очередь;
**${PREFIX}queue** - показывает чо есть в очереди;
  `);
};
