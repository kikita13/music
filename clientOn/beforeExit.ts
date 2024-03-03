import { Client } from "discord.js";
import { DatabaseManager } from "../db/client";

export const beforeExit = async (client: Client, db: DatabaseManager) => {
  db.disconnect();

  client.destroy();
};
