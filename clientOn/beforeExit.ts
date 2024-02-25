import { Client } from "discord.js";
import { DatabaseManager } from "../db/client";

export const beforeExit = async (client: Client, db: DatabaseManager) => {
  await db.disconnect();

  client.destroy();
};
