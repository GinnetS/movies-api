import { Request, Response } from "express";
import { codeResponses } from "../../../utils/codeResponse.utils";
import { listMoviesSeenQuery } from "../queries/list-movies-seen.query";

export const listMoviesSeenService = async (req:Request, res:Response) => {
  try {

    const responseMovie = await listMoviesSeenQuery();

    if(!responseMovie) return codeResponses.conflict(res,"",{details:"No se encontro listado"})

    return codeResponses.successWithData(res,"",{details:responseMovie})
    
  } catch (e: any) {
    return codeResponses.badRequest(res,"",{detail: e.message});
  }
}