import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';
import { Movie } from '../module/movies/entity/movie.entity';
import { User } from '../module/user/entity/user.entity';

const dbUrl = process.env.DATABASE_URL;

export const AppDataSource = new DataSource(
  dbUrl
    ? {
        
        type: 'postgres',
        url: dbUrl,
        ssl: { rejectUnauthorized: false }, 
        logging: false,
        synchronize: false,                 
        entities: [User, Movie, path.join(__dirname, '..', '**', '*.entity.js')],
        migrations: [path.join(__dirname, '..', 'migrations', '*.{js}')],
      }
    : {
      
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: false,
        synchronize: true,
        entities: [User, Movie, 'src/**/*.entity.ts'],
        migrations: ['src/migrations/*.{ts}'],
      }
);
