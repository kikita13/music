import { config } from "./consts";
import { sequelize } from "./consts/sequelize";
import { ConfigColumn } from "./enums";

export class DatabaseManager {
  private db = sequelize;

  async connect() {
    try {
      await this.db.authenticate();
      console.log(`Подключение к базе данных успешно.`);
    } catch (error) {
      console.log(`Ошибка подключения к базе данных: ${error}`);
    }
  }

  async disconnect() {
    try {
      await this.db.close();
      console.log(`Подключение к базе данных успешно разорвано.`);
    } catch (error) {
      console.log(`Ошибка отключения от базы данных: ${error}`);
      throw error;
    }
  }

  async get(configColumn: ConfigColumn, guild: string) {
    try {
      const result = await config.findOne({
        attributes: [configColumn],
        where: {
          guild_id: guild
        }
      })
      console.log(`${configColumn} успешно получено с ${guild}.`);
      return result;
    } catch (error) {
      console.log(`Ошибка при получении ${configColumn} с ${guild}: ${error}`);
      throw error;
    }
  }

  async add(configColumn: ConfigColumn, guild: string, value: string) {
    try {
      const result = await this.get(configColumn, guild);

      if (result && configColumn !== ConfigColumn.guild_id) {
        result[configColumn].push(value);

        await result.save();
        console.log(`Успешно добавлено ${value} в ${configColumn} с ${guild}`);
      }
    } catch (error) {
      console.log(`Ошибка при добавлении ${value} в ${configColumn} с ${guild}: ${error}`);
      throw error;
    }
  }

  async remove(configColumn: ConfigColumn, guild: string, value: string) {
    try {
      const result = await this.get(configColumn, guild);

      if (result && configColumn !== ConfigColumn.guild_id) {
        result[configColumn] = result[configColumn].filter(item => item !== value);

        await result.save();
        console.log(`Успешно удалено ${value} из ${configColumn} с ${guild}`);
      }
    } catch (error) {
      console.log(`Ошибка при удалении ${value} из ${configColumn} с ${guild}: ${error}`);
      throw error;
    }
  }

  async removeConfig(guild: string) {
    try {
      await config.destroy({
        where: {
          guild_id: guild
        }
      });
      console.log(`Конфигурация для ${guild} успешно удалена из базы данных.`);
    } catch (error) {
      console.log(`Ошибка при удалении конфигурации для ${guild}: ${error}`);
      throw error;
    }
  }

  async addDefaultConfig(defaultConfig: any) {
    try {
      await config.create(defaultConfig);
      console.log(`Создан дефолтный конфиг для ${defaultConfig.guild_id}.`);
    } catch (error) {
      console.log(`Ошибка при создании дефолтного конфига для ${defaultConfig.guild_id}: ${error}`);
      throw error;
    }
  }
}
