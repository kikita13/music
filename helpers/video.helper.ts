const youtubeSearch = require("youtube-search-api");

//Производит поиск видео в ютубе по запросу и возвращает массив ссылок
export const searchVideoURLs = async (query: string): Promise<string[]> => {
  //Получаем массив видео по запросц
  const response = await youtubeSearch.GetListByKeyword(query);
  //Преобразуем их id в ссылки
  const links = response.items.map(
    (item: { id: string }) => `https://www.youtube.com/watch?v=${item.id}`
  );
  //Возвращаем ссылки
  return links;
};
