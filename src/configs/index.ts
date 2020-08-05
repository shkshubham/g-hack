import { config } from "dotenv";
config();
export const {
    DB_URL,
    USER_PASSWORD
} = process.env;