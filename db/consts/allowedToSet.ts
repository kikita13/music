import { ConfigColumn } from "../enums";

const allowed = [ConfigColumn.prefix];

export const allowedToSet = (configColumn: ConfigColumn) =>
  allowed.find((allowed) => configColumn === allowed);
