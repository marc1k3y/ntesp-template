import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { PG_DATABASE, PG_HOST, PG_PASSWORD, PG_PORT, PG_USER } from "../variables/constants";

export const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: PG_DATABASE,
  user: PG_USER,
  password: PG_PASSWORD,
  host: PG_HOST,
  port: PG_PORT,
  ssl: false,
  clientMinMessages: "notice",
  define: {
    timestamps: true
  },
});