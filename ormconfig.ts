import * as dotenv from 'dotenv';
import { join } from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({
  path: `.env`,
});

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    join(__dirname, 'dist/src/**', '*.entity.{ts,js}'),
    join(__dirname, 'src/**', '*.entity.{ts,js}'),
  ],
  migrations: [join(__dirname, 'src/database', 'migrations', '*.{ts,js}')],
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
