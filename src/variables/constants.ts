import { join } from "path";
require("dotenv").config({ path: join(__dirname, ".env") });

// general
export const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const PORT = parseInt(process.env.PORT as string);
// postgres
export const PG_DATABASE = process.env.PG_DATABASE;
export const PG_USER = process.env.PG_USER;
export const PG_PASSWORD = process.env.PG_PASSWORD;
export const PG_HOST = process.env.PG_HOST;
export const PG_PORT = parseInt(process.env.PG_PORT as string);