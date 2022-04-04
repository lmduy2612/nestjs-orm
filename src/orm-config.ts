import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as dotenv from 'dotenv';

dotenv.config();

const config: MysqlConnectionOptions = {
  type: 'mysql',
  // database: process.env.DB_NAME,
  // username: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // port: parseInt(process.env.DB_PORT),
  // host: process.env.DB_HOST,
  database: 'nest',
  username: 'root',
  password: 'secret',
  port: 3308,
  host: '10.0.69.115',
  entities: ['dist/models/**/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  migrations: ['dist/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export default config;
