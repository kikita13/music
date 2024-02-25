import { Client } from "pg";
import { GuildConfig, DBResponse } from "./models";
import { TABLE_NAME, CONNECTION_STRING } from "./consts";
//Создаем класс для работы с базой данных
export class DatabaseManager {
  private dbClient: Client;

  constructor() {
    //Создаем клиент по url
    this.dbClient = new Client({ connectionString: CONNECTION_STRING });
  }
  //Метод для поключения к базе
  async connect() {
    try {
      await this.dbClient.connect();
      console.log("Подключение к базе данных успешно");
    } catch (error) {
      console.error("Ошибка при подключении к базе данных:", error);
    }
  }
  //Метод для отключения от базы
  async disconnect() {
    try {
      await this.dbClient.end();
      console.log("Соединение с базой данных закрыто");
    } catch (error) {
      console.error("Ошибка при закрытии соединения с базой данных:", error);
    }
  }
  //Метод для получения конфига определенного сервера
  async getConfig(guildId: number | string): Promise<DBResponse | null> {
    try {
      const result = await this.dbClient.query(
        `SELECT data FROM ${TABLE_NAME} WHERE guild_id = $1`,
        [guildId]
      );
      if (result.rows.length > 0) {
        return result.rows[0].data; //Возвращаем первую найденную запись
      } else {
        return null; //Возвращаем null, если запись не найдена
      }
    } catch (error) {
      console.error("Ошибка при получении данных из базы данных:", error);
      return null;
    }
  }
  //Метод для добавления конфига определенного сервера
  async updateConfig(guildId: string, newData: GuildConfig): Promise<boolean> {
    try {
      const result = await this.dbClient.query(
        `INSERT INTO ${TABLE_NAME} (guild_id, data) VALUES ($1, $2) ON CONFLICT (guild_id) DO UPDATE SET data = $2`,
        [guildId, newData]
      );
      return true; //Возвращаем true при успешном обновлении данных
    } catch (error) {
      console.error("Ошибка при обновлении данных в базе данных:", error);
      return false; //Возвращаем false при возникновении ошибки
    }
  }

  async addDefaultConfig(
    guildId: string,
    defaultConfig: GuildConfig
  ): Promise<boolean> {
    //Метод для добавления дефолтного конфига при добавлении бота на новый канал
    try {
      const result = await this.dbClient.query(
        `INSERT INTO ${TABLE_NAME} (guild_id, data) VALUES ($1, $2)`,
        [guildId, defaultConfig]
      );
      return true;
    } catch (error) {
      console.error(
        "Ошибка при добавлении дефолтного конфига в базу данных:",
        error
      );
      return false;
    }
  }

  async removeConfig(guildId: string) {
    //Метод для удаления конфига при удалении бота из канала
    try {
      const result = await this.dbClient.query(
        `DELETE FROM ${TABLE_NAME} WHERE guild_id = $1`,
        [guildId]
      );
      return true;
    } catch (error) {
      console.error("Ошибка при удалении конфига из базы данных:", error);
      return false;
    }
  }

  async getAdminIds(guildId: string): Promise<string[] | null> {
    try {
      const result = await this.dbClient.query(
        `SELECT data FROM ${TABLE_NAME} WHERE guild_id = $1`,
        [guildId]
      );
      if (result.rows.length > 0) {
        const config = result.rows[0];
        return config.data.administrators;
      } else {
        return null;
      }
    } catch (error) {
      console.error(
        "Ошибка при получении ids администраторов из базы данных:",
        error
      );
      return null;
    }
  }

  async addAdminId(guildId: string, adminId: string): Promise<boolean> {
    try {
      const current = await this.getAdminIds(guildId);
      if (current) {
        const adminIds = [...current, adminId];
        await this.dbClient.query(
          `UPDATE ${TABLE_NAME} SET data = jsonb_set(data, $1, $2, true) WHERE guild_id = $3`,
          ["{administrators}", JSON.stringify(adminIds), guildId]
        );
      }

      return true;
    } catch (error) {
      console.error(
        "Ошибка при добавлении ids администраторов в базу данных:",
        error
      );
      return false;
    }
  }

  async getBotUseIds(guildId: string): Promise<string[] | null> {
    try {
      const result = await this.dbClient.query(
        `SELECT data FROM ${TABLE_NAME} WHERE guild_id = $1`,
        [guildId]
      );
      if (result.rows.length > 0) {
        const config = result.rows[0] as DBResponse;
        return config.data.ids_for_bot_use;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Ошибка при получении ids bot use из базы данных:", error);
      return null;
    }
  }

  async addBotUseId(guildId: string, botUseId: string): Promise<boolean> {
    try {
      const current = await this.getBotUseIds(guildId);
      if (current) {
        const botUseIds = [...current, botUseId];
        await this.dbClient.query(
          `UPDATE ${TABLE_NAME} SET data = jsonb_set(data, $1, $2, true) WHERE guild_id = $3`,
          ["{ids_for_bot_use}", JSON.stringify(botUseIds), guildId]
        );
      }

      return true;
    } catch (error) {
      console.error("Ошибка при добавлении ids bot use в базу данных:", error);
      return false;
    }
  }

  async getQueue(guildId: string): Promise<string[] | null> {
    try {
      const result = await this.dbClient.query(
        `SELECT data FROM ${TABLE_NAME} WHERE guild_id = $1`,
        [guildId]
      );
      if (result.rows.length > 0) {
        const config = result.rows[0] as DBResponse;
        return config.data.queue;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Ошибка при получении очереди из базы данных:", error);
      return null;
    }
  }

  async addToQueue(guildId: string, item: string | string[]): Promise<boolean> {
    try {
      // Проверяем, является ли item строкой или массивом
      const newItem = Array.isArray(item) ? item : [item];

      // Получаем текущий список элементов в очереди
      const currentQueue = await this.getQueue(guildId);

      if (!currentQueue) {
        console.error("Не удалось получить текущую очередь из базы данных.");
        return false;
      }

      // Объединяем текущую очередь с новыми элементами
      const updatedQueue = [...currentQueue, ...newItem];

      // Обновляем данные в базе данных с новым списком
      await this.dbClient.query(
        `UPDATE ${TABLE_NAME} SET data = jsonb_set(data, $1, $2) WHERE guild_id = $3`,
        ["{queue}", JSON.stringify(updatedQueue), guildId]
      );
      return true;
    } catch (error) {
      console.error(
        "Ошибка при добавлении элемента в очередь в базу данных:",
        error
      );
      return false;
    }
  }

  async clearQueue(guildId: string): Promise<boolean> {
    try {
      await this.dbClient.query(
        `UPDATE ${TABLE_NAME} SET data = jsonb_set(data, $1, $2) WHERE guild_id = $3`,
        ["{queue}", "[]", guildId]
      );
      return true;
    } catch (error) {
      console.error("Ошибка при очистке очереди в базе данных:", error);
      return false;
    }
  }

  async getAndRemoveFromQueue(guildId: string): Promise<string | null> {
    try {
      const result = await this.dbClient.query(
        `SELECT data FROM ${TABLE_NAME} WHERE guild_id = $1`,
        [guildId]
      );
      if (result.rows.length > 0) {
        const config = result.rows[0] as DBResponse;
        const queue = config.data.queue;
        if (queue.length > 0) {
          const firstItem = queue.shift() as string;
          await this.dbClient.query(
            `UPDATE ${TABLE_NAME} SET data = jsonb_set(data, $1, $2) WHERE guild_id = $3`,
            ["{queue}", JSON.stringify(queue), guildId]
          );
          return firstItem;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error(
        "Ошибка при получении и удалении элемента из очереди в базе данных:",
        error
      );
      return null;
    }
  }

  async updatePrefix(guildId: string, newPrefix: string): Promise<boolean> {
    try {
      //Выполняем запрос на обновление префикса
      const result = await this.dbClient.query(
        `UPDATE ${TABLE_NAME} SET data = jsonb_set(data, $1, $2) WHERE guild_id = $3`,
        ["{prefix}", `"${newPrefix}"`, guildId]
      );
      console.log("Префикс успешно обновлен.");
      return true; //Возвращаем true при успешном обновлении
    } catch (error) {
      console.error("Ошибка при обновлении префикса:", error);
      return false; //Возвращаем false при возникновении ошибки
    }
  }

  async getPrefix(guildId: string): Promise<string | null> {
    try {
      //Выполняем запрос к базе данных для получения данных
      const result = await this.dbClient.query(
        `SELECT data FROM ${TABLE_NAME} WHERE guild_id = $1`,
        [guildId]
      );
      if (result.rows.length > 0) {
        //Если данные найдены, извлекаем JSON из столбца "data"
        const jsonData = result.rows[0].data;
        const prefix = jsonData.prefix;
        return prefix;
      } else {
        //Если данных не найдено, возвращаем null
        return null;
      }
    } catch (error) {
      console.error("Ошибка при получении префикса из базы данных:", error);
      return null;
    }
  }

  async shuffleQueue(guildId: string): Promise<boolean> {
    try {
      // Получаем текущий список элементов в очереди
      const currentQueue = await this.getQueue(guildId);

      if (!currentQueue) {
        console.error("Не удалось получить текущую очередь из базы данных.");
        return false;
      }

      // Перемешиваем очередь
      const shuffledQueue = this.shuffleArray(currentQueue);

      // Обновляем данные в базе данных с новым перемешанным списком
      const success = await this.dbClient.query(
        `UPDATE ${TABLE_NAME} SET data = jsonb_set(data, $1, $2) WHERE guild_id = $3`,
        ["{queue}", JSON.stringify(shuffledQueue), guildId]
      );

      if (success) {
        console.log(`Очередь для сервера ${guildId} успешно перемешана.`);
        return true;
      } else {
        console.error(
          `Ошибка при обновлении очереди для сервера ${guildId} в базе данных.`
        );
        return false;
      }
    } catch (error) {
      console.error("Ошибка при перемешивании очереди в базе данных:", error);
      return false;
    }
  }

  private shuffleArray(array: string[]) {
    const copy = [...array];

    copy.sort(() => Math.random() - 0.5);

    return copy;
  }
}
