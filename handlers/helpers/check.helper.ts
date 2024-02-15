export const checkOnLink = (argument: string, links: string[]) => {
  return argument.startsWith("http") ? argument : links[0];
};
