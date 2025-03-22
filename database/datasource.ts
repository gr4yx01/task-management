import { DataSource } from "typeorm";
import { config } from "dotenv";

config()

const isDevelopment = process.env.NODE_ENV === 'development'

export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    synchronize: true,
    migrations: [process.env.DB_MIGRATIONS!],
    entities: [process.env.DB_ENTITIES!],
})
