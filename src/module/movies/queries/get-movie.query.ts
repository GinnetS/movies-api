import { AppDataSource } from "../../../shared/data-source";
import { Movie } from "../entity/movie.entity";
import { ILike } from "typeorm";

export async function getMovies(
  title?: string,
  categoryId?: string | number,
  pageNum = 1,
  limitNum = 10,
  sort: string = "releaseDate_desc"
) {
  const skip = (pageNum - 1) * limitNum;
  const where: any = {};
  if (title) where.title = ILike(`%${title}%`);
  if (categoryId) where.category = { id: categoryId };

  const order: any = {};
  if (sort === "releaseDate_asc") order.releaseDate = "ASC";
  else order.releaseDate = "DESC";

  const repo = AppDataSource.getRepository(Movie);
  const [items, total] = await repo.findAndCount({
    where,
    order,
    skip,
    take: limitNum,
  });

  return { items, total };
}
