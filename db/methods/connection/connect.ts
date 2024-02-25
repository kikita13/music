import { Client } from "pg";

export const connect = async (db: Client) => {
  try {
    await db.connect();
    console.log("Подключение к базе данных успешно");
  } catch (error) {
    console.error("Ошибка при подключении к базе данных:", error);
  }
};
