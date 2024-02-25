import { Client } from "pg";
import { GuildConfig } from "./models";
import { CONNECTION_STRING } from "./consts";
import {
  connect,
  disconnect,
  addDefaultConfig,
  getConfig,
  removeConfig,
  updateConfig,
  getAdminIds,
  addAdminId,
  getBotUseIds,
  addBotUseId,
  getNextFromQueue,
  getQueue,
  addToQueue,
  clearQueue,
  shuffleQueue,
  updatePrefix,
  getPrefix,
} from "./methods";
//Создаем класс для работы с базой данных
export class DatabaseManager {
  private dbClient: Client;

  //Создаем клиент по url
  constructor() {
    this.dbClient = new Client({ connectionString: CONNECTION_STRING });
  }

  readonly connection = {
    connect: async () => await connect(this.dbClient),
    disconnect: async () => await disconnect(this.dbClient),
  };

  readonly config = {
    get: async (guildId: string) => await getConfig(this.dbClient, guildId),
    update: async (guildId: string, newData: GuildConfig) =>
      await updateConfig(this.dbClient, guildId, newData),
    setDefault: async (guildId: string, defaultConfig: GuildConfig) =>
      await addDefaultConfig(this.dbClient, guildId, defaultConfig),
    remove: async (guildId: string) =>
      await removeConfig(this.dbClient, guildId),
  };

  readonly administrators = {
    get: async (guildId: string) => await getAdminIds(this.dbClient, guildId),
    add: async (guildId: string, adminId: string) =>
      await addAdminId(this.dbClient, guildId, adminId),
  };

  readonly botUse = {
    get: async (guildId: string) => await getBotUseIds(this.dbClient, guildId),
    add: async (guildId: string, botUseId: string) =>
      await addBotUseId(this.dbClient, guildId, botUseId),
  };

  readonly queue = {
    get: async (guildId: string) => await getQueue(this.dbClient, guildId),
    add: async (guildId: string, item: string | string[]) =>
      await addToQueue(this.dbClient, guildId, item),
    clear: async (guildId: string) => await clearQueue(this.dbClient, guildId),
    next: async (guildId: string) =>
      await getNextFromQueue(this.dbClient, guildId),
    shuffle: async (guildId: string) =>
      await shuffleQueue(this.dbClient, guildId),
  };

  readonly prefix = {
    set: async (guildId: string, newPrefix: string) =>
      await updatePrefix(this.dbClient, guildId, newPrefix),
    get: async (guildId: string) => await getPrefix(this.dbClient, guildId),
  };
}
