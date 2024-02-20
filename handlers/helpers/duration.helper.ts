//Длительность в секундах в привычный формат
export const duration = (time: number) => {
  //Получаем нулевую дату
  const date = new Date(0);
  //Кладем туда секунды
  date.setSeconds(+time);
  //Полуаем из даты [часы, минуты, секунды]
  const sub = date.toISOString().split('T')[1].split('.')[0].split(':');
  //Формируем строку для длительности
  const text = sub[0] === '00'
    ? `${sub[1]}:${sub[2]}`
    : `${sub[0]}:${sub[1]}:${sub[2]}`;
  //Возвращаем длительность
  return text;
};
