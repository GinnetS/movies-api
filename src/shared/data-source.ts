import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();


import { Category } from '../categories/category.entity';

import { Watched } from '../watched/watched.entity';
import { User } from '../module/user/entity/user.entity';
import { Movie } from '../module/movies/entity/movie.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Category, Movie, Watched],
});