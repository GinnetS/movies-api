import { Request, Response } from "express";
import { codeResponses } from "../../../utils/codeResponse.utils";
import { CreateUserCommands } from "../commands/create-user.commands";

export const createUserService = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return codeResponses.badRequest(res,"", {detail : "name y email son requeridos"});
    
    const reponseUser = await CreateUserCommands(name,email);
    if(reponseUser.status !==201 ) return  codeResponses.conflict(res,"",{detail:reponseUser.message});

    return codeResponses.created(res,reponseUser.data,"");
  } catch (e: any) {
    return codeResponses.error(res,"", {detail: e.message });

  }
}