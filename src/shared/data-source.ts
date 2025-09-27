// data-source.ts (tu mismo archivo, con pequeños cambios)
import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../module/user/entity/user.entity';
import { Category } from '../categories/category.entity';
import { Movie } from '../module/movies/entity/movie.entity';
import { Watched } from '../watched/watched.entity';

const dbUrl = process.env.DATABASE_URL;
const isProd = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource(
  dbUrl
    ? {
        type: 'postgres',
        url: dbUrl,
        ssl: isProd ? { rejectUnauthorized: false } : false,   
        logging: false,
        synchronize: true,
        entities: [User, Category, Movie, Watched],
        migrations: ['dist/migrations/*.js'],
      }
    : {
        type: 'postgres',
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT ?? 5432),
        username: process.env.DB_USER!,
        password: String(process.env.DB_PASS ?? ''),
        database: process.env.DB_NAME!,
        logging: false,
        synchronize: true,
        entities: [User, Category, Movie, Watched],
      }
);
