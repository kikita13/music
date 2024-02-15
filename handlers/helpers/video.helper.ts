import play from "play-dl";
import { duration } from "./duration.helper";

// формирует стрингу для показа того, что сейчас играет
export const videoInfo = async (link: string): Promise<string> => {
  //Получаем полную информацию о видео
  const info = await play.video_basic_info(link);
  //Получаем название и длительность в секундах
  const { title, durationInSec } = info.video_details;
  //Получаем длительность в нормальном формате
  const time = duration(durationInSec);
  //Формируем ответ
  const response = `[${title}](${link}) | (${time})`;

  return response;
};

export const nowPlaying = async (link: string) => {
  return `Сейчас играет ${await videoInfo(link)}`;
};

export const addedToQueue = async (link: string) => {
  return `Добавлено в очередь ${await videoInfo(link)}`;
};
