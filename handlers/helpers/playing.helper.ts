import ytdl from "ytdl-core";
import { duration } from "./duration.helper";

// формирует стрингу для показа того, что сейчас играет
export const nowPlaying = async (link: string): Promise<string> => {
  //Получаем полную информацию о видео
  const info = await ytdl.getBasicInfo(link);
  //Получаем название и длительность в секундах
  const { title, lengthSeconds } = info.videoDetails;
  //Получаем длительность в нормальном формате
  const time = duration(lengthSeconds);
  //Формируем ответ
  const response = `Сейчас играет [${title}](${link}) | (${time})`;
  
  return response;
};
