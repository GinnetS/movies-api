import { Request, Response } from "express";
import { seenMovieQuery } from "../commands/see-movie.commands";
import { codeResponses } from "../../../utils/codeResponse.utils";

export const SeenMovieService = async (req:Request, res:Response) => {
  try {
    const { userId, movieId } = req.body;

    const reponseSeen = await seenMovieQuery(userId,movieId);

    if(reponseSeen.status !== 200) return codeResponses.conflict(res,"",{detail:reponseSeen.message});

    return codeResponses.successWithData(res,"",{detail:reponseSeen.data})

  } catch (e: any) {
    
    return codeResponses.error(res,"",{detail: e.message})
    
  }
}