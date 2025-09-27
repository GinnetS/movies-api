import { AppDataSource } from "../../../shared/data-source";
import { HttpStatusCode } from "../../../utils/codeResponse.utils";
import { User } from "../entity/user.entity";

export async function CreateUserCommands(name: string, email: string) {
  const repo = AppDataSource.getRepository(User);
  const exists = await repo.findOne({ where: { email } });

  if (exists) {
    return { status: HttpStatusCode.CONFLICT, message: "Email ya registrado" };
  }

  const user = repo.create({ name, email });
  await repo.save(user);

  return { status: HttpStatusCode.CREATED, data: user };
}
