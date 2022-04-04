import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as dotenv from 'dotenv';

dotenv.config();

const config: MysqlConnectionOptions = {
  type: 'mysql',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT),
  host: process.env.DB_HOST,
  entities: ['dist/models/**/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  migrations: ['dist/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export default config;
