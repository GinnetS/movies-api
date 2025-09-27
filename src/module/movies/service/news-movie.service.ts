import { Request, Response } from "express";
import { newsMoviesQuery } from "../queries/news-movies.query";
import { codeResponses } from "../../../utils/codeResponse.utils";

export const newMovieService = async (_req:Request, res:Response) => {
  try {

    const reponseNews = await newsMoviesQuery();
    if(reponseNews.status !== 200) return codeResponses.notFound(res,"",{detail: reponseNews.message});
    
   return codeResponses.successWithData(res,"",reponseNews.data);
  } catch (e: any) {
    res.status(500).json({ message: 'Error listando novedades', detail: e.message });
  }
}