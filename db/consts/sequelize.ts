import { Sequelize } from "sequelize";
import { CONNECTION_STRING } from "./connectionString";

export const sequelize = new Sequelize(CONNECTION_STRING);
