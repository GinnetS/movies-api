import express from 'express';
import { router as usersRouter } from './routes/users';
import { router as moviesRouter } from './routes/movies';

export const app = express();
app.use(express.json());

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'movies-api' });
});