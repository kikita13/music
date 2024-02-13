export const duration = (time: string) => {
  const date = new Date(0);

  date.setSeconds(+time);

  const sub = date.toISOString().split('T')[1].split('.')[0].split(':');
  
  const text = sub[0] === '00'
    ? `${sub[1]}:${sub[2]}`
    : `${sub[0]}:${sub[1]}:${sub[2]}`
    
  return text;
};
