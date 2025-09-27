import { Category } from "../../../categories/category.entity";
import { AppDataSource } from "../../../shared/data-source";
import { HttpStatusCode } from "../../../utils/codeResponse.utils";
import { Movie } from "../entity/movie.entity";

export async function CreateMoviCommands(title:string,
    releaseDate:string,categoryId:string
) {

    const catRepo = AppDataSource.getRepository(Category);
    const category = await catRepo.findOne({ where: { id: categoryId } });

    if (!category) return {status: HttpStatusCode.NOT_FOUND, message: 'Categoría no encontrada' };

    const repo = AppDataSource.getRepository(Movie);
    const movie = repo.create({ title, releaseDate, category });
    await repo.save(movie);

    return { status: HttpStatusCode.CREATED, data: movie };
}



