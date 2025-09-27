import { Router } from 'express';
import { AppDataSource } from '../shared/data-source';
import { User } from '../users/user.entity';
import { Watched } from '../watched/watched.entity';
import { Movie } from '../movies/movie.entity';

export const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'name y email son requeridos' });

    const repo = AppDataSource.getRepository(User);
    const exists = await repo.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email ya registrado' });

    const user = repo.create({ name, email });
    await repo.save(user);
    res.status(201).json(user);
  } catch (e: any) {
    res.status(500).json({ message: 'Error creando usuario', detail: e.message });
  }
});

router.post('/:userId/watch/:movieId', async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const userRepo = AppDataSource.getRepository(User);
    const movieRepo = AppDataSource.getRepository(Movie);
    const watchedRepo = AppDataSource.getRepository(Watched);

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const movie = await movieRepo.findOne({ where: { id: movieId } });
    if (!movie) return res.status(404).json({ message: 'Película no encontrada' });

    const existing = await watchedRepo.findOne({ where: { user: { id: userId }, movie: { id: movieId } } });
    if (existing) return res.status(409).json({ message: 'Ya estaba marcada como vista' });

    const record = watchedRepo.create({ user, movie });
    await watchedRepo.save(record);
    res.status(201).json({ message: 'Marcada como vista', record });
  } catch (e: any) {
    res.status(500).json({ message: 'Error al marcar vista', detail: e.message });
  }
});

router.get('/watched', async (_req, res) => {
  try {
    const watchedRepo = AppDataSource.getRepository(Watched);
    const records = await watchedRepo.find();
    const byUser = new Map<string, { user: any, movies: any[] }>();
    for (const r of records) {
      const key = r.user.id;
      if (!byUser.has(key)) byUser.set(key, { user: r.user, movies: [] });
      byUser.get(key)!.movies.push({ id: r.movie.id, title: r.movie.title, category: r.movie.category.name, watchedAt: r.watchedAt });
    }
    res.json(Array.from(byUser.values()));
  } catch (e: any) {
    res.status(500).json({ message: 'Error listando vistas', detail: e.message });
  }
});