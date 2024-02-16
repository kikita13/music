import play from "play-dl";
import { duration } from "./duration.helper";
import { QUEUE } from "../../consts/queue";
const youtubeSearch = require("youtube-search-api");

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

export const addPlayListToQueue = async (link: string) => {
  const urls = await getPlaylistUrls(link);

  QUEUE.push(...urls);
  
  return QUEUE.shift() as string;
};

const formatPlayListLink = (link: string) => link.split("list=")[1].split("&")[0];

export const getPlaylistUrls = async (link: string) => {
  const formatedLink = formatPlayListLink(link);

  const playlistInfo = await youtubeSearch.GetPlaylistData(formatedLink, 200);

  return playlistInfo.items.map((video: { id: string; }) => `https://www.youtube.com/watch?v=${video.id}`) as string[]
}
