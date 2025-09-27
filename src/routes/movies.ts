import { Router } from 'express';
import { AppDataSource } from '../shared/data-source';
import { Movie } from '../movies/movie.entity';
import { Category } from '../categories/category.entity';
import { ILike } from 'typeorm';

export const router = Router();

router.post('/', async (req, res) => {
  try {
    const { title, releaseDate, categoryId } = req.body;
    if (!title || !releaseDate || !categoryId) {
      return res.status(400).json({ message: 'title, releaseDate (YYYY-MM-DD) y categoryId son requeridos' });
    }

    const catRepo = AppDataSource.getRepository(Category);
    const category = await catRepo.findOne({ where: { id: categoryId } });
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });

    const repo = AppDataSource.getRepository(Movie);
    const movie = repo.create({ title, releaseDate, category });
    await repo.save(movie);
    res.status(201).json(movie);
  } catch (e: any) {
    res.status(500).json({ message: 'Error creando película', detail: e.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { title, categoryId, page = '1', limit = '10', sort = 'releaseDate_desc' } = req.query as Record<string, string>;
    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit) || 10, 1), 50);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (title) where.title = ILike(`%${title}%`);
    if (categoryId) where.category = { id: categoryId };

    const order: any = {};
    if (sort === 'releaseDate_asc') order.releaseDate = 'ASC';
    else order.releaseDate = 'DESC';

    const repo = AppDataSource.getRepository(Movie);
    const [items, total] = await repo.findAndCount({
      where,
      order,
      skip,
      take: limitNum,
    });

    res.json({
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
      items,
    });
  } catch (e: any) {
    res.status(500).json({ message: 'Error listando películas', detail: e.message });
  }
});

router.get('/novedades', async (_req, res) => {
  try {
    const repo = AppDataSource.getRepository(Movie);
    const today = new Date();
    const date21 = new Date(today.getTime() - 21 * 24 * 60 * 60 * 1000);
    const since = date21.toISOString().slice(0,10);

    const items = await repo
      .createQueryBuilder('movie')
      .where('movie.releaseDate >= :since', { since })
      .orderBy('movie.releaseDate', 'DESC')
      .getMany();

    res.json(items);
  } catch (e: any) {
    res.status(500).json({ message: 'Error listando novedades', detail: e.message });
  }
});