import { DataTypes } from "sequelize";
import { sequelize } from "./sequelize";
import { GuildConfig } from "../models";

export const config = sequelize.define<GuildConfig>("config", {
  guild_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
  },
  prefix: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  ids_for_bot_use: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    allowNull: false,
  },
  administrators: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    allowNull: false,
  },
  queue: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    allowNull: false,
  },
});
