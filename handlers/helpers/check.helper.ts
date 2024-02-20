import { addPlayListToQueue } from "./video.helper";
//Проверяет аргумент на наличие ссылки
export const checkOnLink = async (argument: string, links: string[]) => {
  //Если начинается с http то 
  return argument.startsWith("http") 
    ? argument.includes('&list=') //Если это плейлист
      ? await addPlayListToQueue(argument)
      : argument
    : links[0];
};
