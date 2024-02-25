import { Message } from "discord.js";
import { DatabaseManager } from "../db/client";

export const setPrefixCommand = async (
  message: Message,
  newPrefix: string,
  db: DatabaseManager
) => {
  //Если префикс пустой
  if (newPrefix === "") return message.reply("Префикс не может быть пустым!");
  //Если сообщение не из канала
  if (!message.guild) return;
  //Получаем текущую конфигурацию
  await db.updatePrefix(message.guild.id, newPrefix);
  //Отправляем сообщение об успешном изменении префикса
  message.channel.send(`Префикс изменен на ${newPrefix}`);
};
