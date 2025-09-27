import { AppDataSource } from "../../../shared/data-source";
import { HttpStatusCode } from "../../../utils/codeResponse.utils";
import { Movie } from "../entity/movie.entity";

export async function newsMoviesQuery() {
    const repo = AppDataSource.getRepository(Movie);
    const today = new Date();
    const date21 = new Date(today.getTime() - 21 * 24 * 60 * 60 * 1000);
    const since = date21.toISOString().slice(0,10);

    const items = await repo
      .createQueryBuilder('movie')
      .where('movie.releaseDate >= :since', { since })
      .orderBy('movie.releaseDate', 'DESC')
      .getMany();

        if (!items) {
    return { status: HttpStatusCode.CONFLICT, message: "No existen novedades" };
  }

      return { status: HttpStatusCode.OK, data: items};
}