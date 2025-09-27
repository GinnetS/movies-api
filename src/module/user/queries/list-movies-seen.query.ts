import { AppDataSource } from "../../../shared/data-source";
import { Watched } from "../../../watched/watched.entity";

export async function listMoviesSeenQuery() {
    const watchedRepo = AppDataSource.getRepository(Watched);
    const records = await watchedRepo.find();
    const byUser = new Map<string, { user: any, movies: any[] }>();

    for (const r of records) {
      const key = r.user.id;
      if (!byUser.has(key)) byUser.set(key, { user: r.user, movies: [] });
      byUser.get(key)!.movies.push({ id: r.movie.id, title: r.movie.title, category: r.movie.category.name, watchedAt: r.watchedAt });
    }
    
    return Array.from(byUser.values())
}