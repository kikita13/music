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
  // Удаление всех символов, кроме цифр, знаков препинания и букв любого алфавита (включая верхний регистр)
  let cleanTitle = title?.replace(/[^\s\w\d\p{Lu}.,!?]/gu, '');
  // Удаление повторяющихся пробелов
  cleanTitle = cleanTitle?.replace(/\s+/g, ' ');
  //Формируем ответ
  const response = `[${cleanTitle}](${link}) | (${time})`;

  return response;
};
//Отображает то что играет сейчас
export const nowPlaying = async (link: string) => {
  return `Сейчас играет ${await videoInfo(link)}`;
};
//Оторображает что было добавлено в очередь
export const addedToQueue = async (link: string) => {
  return `Добавлено в очередь ${await videoInfo(link)}`;
};
//Добавление плейлиста в очередь
export const addPlayListToQueue = async (link: string) => {
  //Получаем ссылки видео из плейлиста
  const urls = await getPlaylistUrls(link);
  //Пихаем их в очередь
  QUEUE.push(...urls);
  //Возвращаем первый элемент очереди
  return QUEUE.shift() as string;
};
//Достает из ссылки id плейлиста
const formatPlayListLink = (link: string) => link.split("list=")[1].split("&")[0];
//Получение ссылок из плейлиста
export const getPlaylistUrls = async (link: string) => {
  //Получаем id плейлиста
  const formatedLink = formatPlayListLink(link);
  //Получаем данные о плейлисте
  const playlistInfo = await youtubeSearch.GetPlaylistData(formatedLink, 200);
  //Формируем из id видосов ссылки на них и возвращаем их
  return playlistInfo.items.map((video: { id: string; }) => `https://www.youtube.com/watch?v=${video.id}`) as string[]
}
