import { AppDataSource } from './data-source';
import { Category } from '../categories/category.entity';

export async function bootstrap() {
  const repo = AppDataSource.getRepository(Category);
  const count = await repo.count();
  if (count === 0) {
    const names = ['Terror', 'Suspenso', 'Drama', 'Comedia'];
    const categories = names.map((name) => repo.create({ name }));
    await repo.save(categories);
    console.log('[seed] categorías creadas:', names.join(', '));
  }
}