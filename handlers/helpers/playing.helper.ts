import play from "play-dl";
import { duration } from "./duration.helper";

// формирует стрингу для показа того, что сейчас играет
export const nowPlaying = async (link: string): Promise<string> => {
  //Получаем полную информацию о видео
  const info = await play.video_basic_info(link);
  //Получаем название и длительность в секундах
  const { title, durationInSec } = info.video_details;
  //Получаем длительность в нормальном формате
  const time = duration(durationInSec);
  //Формируем ответ
  const response = `Сейчас играет [${title}](${link}) | (${time})`;
  
  return response;
};
