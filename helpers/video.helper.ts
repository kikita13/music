const youtubeSearch = require("youtube-search-api");

//Производит поиск видео в ютубе по запросу и возвращает массив ссылок
export const searchVideoURLs = async (query: string): Promise<string[]> => {
  const response = await youtubeSearch.GetListByKeyword(query);

  const links = response.items.map(
    (item: { id: string }) => 
    `https://www.youtube.com/watch?v=${item.id}`
  );

  return links;
};
