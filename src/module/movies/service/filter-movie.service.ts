import { Request, Response } from "express";
import { getMovies } from "../queries/get-movie.query";
import { codeResponses } from "../../../utils/codeResponse.utils";

export const FilterMovieService = async (req: Request, res: Response) => {
  try {
     const { title, categoryId, page = "1", limit = "10", sort = "releaseDate_desc" } =
      req.body as Record<string, string>;

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit) || 10, 1), 50);

    const { items, total } = await getMovies(title, categoryId, pageNum, limitNum, sort);

    if (total === 0) {
  return codeResponses.notFound(res, "No se encontraron películas", {
    filters: { title, categoryId },
  });
}

    return codeResponses.successWithData(res,"",{
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
      items,
    });
  } catch (e: any) {
    return codeResponses.error(res,"",{detail: e.message});
  }
};
