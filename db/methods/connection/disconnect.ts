import { Client } from "pg";

export const disconnect = async (db: Client) => {
  try {
    await db.end();
    console.log("Соединение с базой данных закрыто");
  } catch (error) {
    console.error("Ошибка при закрытии соединения с базой данных:", error);
  }
};
