import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import './env';
import { Users } from '../entities/users.entity';

const convertToNumber = (value: string | number): number => {
  if (typeof value === 'string') {
    return Number(value);
  } else if (typeof value === 'number') {
    return value;
  }
};

const config = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: `${convertToNumber(process.env.DB_PORT)}`,
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: [Users],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  synchronize: false,
  logging: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
