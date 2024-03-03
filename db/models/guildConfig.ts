import { Model } from "sequelize";
import { GuildConfigAttributes } from "./guildConfigAttributes";

export interface GuildConfig extends Model<GuildConfigAttributes>, GuildConfigAttributes {}
