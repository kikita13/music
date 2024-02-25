import {
  messageCreate,
  guildDelete,
  ready,
  beforeExit,
  guildCreate,
} from "./clientOn";
import { getClient } from "./helpers/index";
import { DatabaseManager } from "./db/client";
import { BOT_TOKEN } from "./consts";

const db = new DatabaseManager();

const client = getClient();

//Устанавливаем статус боту и подключаемся к базе данных
client.once("ready", async () => await ready(client, db));

//При приглашении в новый канал
client.on("guildCreate", async (guild) => await guildCreate(guild, db));

//При удалении бота из канала
client.on("guildDelete", async (guild) => await guildDelete(guild, db));

//Реагирует на сообщение
client.on("messageCreate", async (message) => await messageCreate(message, db));

//Перед завершением процесса чистить очередь и разывает связь
process.on("beforeExit", async () => await beforeExit(client, db));

//Формирует клиент, принимает токен бота
client.login(BOT_TOKEN);
