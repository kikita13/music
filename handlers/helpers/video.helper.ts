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
  // Удаление всех символов, кроме цифр, знаков препинания и букв любого алфавита
  let cleanTitle = title?.replace(/[^\w\d\u0400-\u04FF\u0500-\u052F\u2DE0-\u2DFF\uA640-\uA69F.,!?]/gu, '');
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
// Добавление плейлиста в конец очереди
export const addPlayListToQueue = async (link: string) => {
  // Получаем ссылки видео из плейлиста
  const urls = await getPlaylistUrls(link);
  // Пихаем их в конец очереди
  QUEUE.push(...urls);
  // Не удаляем первый элемент, возвращаем его
  return urls[0];
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
