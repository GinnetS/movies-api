import { AppDataSource } from "../../../shared/data-source";
import { HttpStatusCode } from "../../../utils/codeResponse.utils";
import { Watched } from "../../../watched/watched.entity";
import { Movie } from "../../movies/entity/movie.entity";
import { User } from "../entity/user.entity";

export async function seenMovieQuery(userId:string,movieId:string) {

    const userRepo = AppDataSource.getRepository(User);
    const movieRepo = AppDataSource.getRepository(Movie);
    const watchedRepo = AppDataSource.getRepository(Watched);

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) return  {status:HttpStatusCode.NOT_FOUND , message: 'Usuario no encontrado' };

    const movie = await movieRepo.findOne({ where: { id: movieId } });
    if (!movie) return {status:HttpStatusCode.NOT_FOUND, message: 'Película no encontrada' };

    const existing = await watchedRepo.findOne({ where: { user: { id: userId }, movie: { id: movieId } } });
    if (existing) return { status:HttpStatusCode.CONFLICT, message: 'Ya estaba marcada como vista' };

    const record = watchedRepo.create({ user, movie });
    await watchedRepo.save(record);

    return { status: HttpStatusCode.OK, data: user };
    
}