import { addPlayListToQueue } from "./video.helper";

export const checkOnLink = async (argument: string, links: string[]) => {
  return argument.startsWith("http") 
    ? argument.includes('&list=')
      ? await addPlayListToQueue(argument)
      : argument
    : links[0];
};
