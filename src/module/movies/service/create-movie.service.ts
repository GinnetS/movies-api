import { Request, Response } from "express";
import { codeResponses } from "../../../utils/codeResponse.utils";
import { CreateMoviCommands } from "../commands/create-movie.commands";

export const createMovieService = async (req:Request, res:Response) => {
  try {

    const { title, releaseDate, categoryId } = req.body;
    if (!title || !releaseDate || !categoryId) {
      return codeResponses.badRequest(res,"",
        {details:"title, releaseDate (YYYY-MM-DD) y categoryId son requeridos"});
    }

    const reponseMovie = await CreateMoviCommands(title,releaseDate,categoryId);
     if(reponseMovie.status !==201 ) return  codeResponses.conflict(res,"",{detail:reponseMovie.message});

    return codeResponses.created(res,reponseMovie.data,"");
  } catch (e: any) {
    res.status(500).json({ message: 'Error creando película', detail: e.message });
  }
}