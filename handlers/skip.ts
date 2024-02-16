import { Message } from "discord.js";
import { getNextResource, player } from "./play";

//Выполняется при команде *prefix*skip
export const skipCommand = async (message: Message) => {
  await getNextResource(player, message);
};
