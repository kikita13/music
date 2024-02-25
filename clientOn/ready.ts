import { ActivityType, Client } from "discord.js";
import { DatabaseManager } from "../db/client";

export const ready = async (client: Client, db: DatabaseManager) => {
  client.user?.setActivity("Дёргаю анус", { type: ActivityType.Custom });

  await db.connect();
};
