import * as dotenv from 'dotenv';
dotenv.config();

interface IConfig {
    PORT: number,
    NODE_ENV: string,
    DB_URL: string
}

const config: IConfig = {
    PORT: Number(process.env.PORT) || 3000,
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL,
}

export default config
