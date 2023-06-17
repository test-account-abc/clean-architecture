import "reflect-metadata";
import { inject, injectable } from "inversify";
import { SYMBOLS } from "../../di/symbols";
import { ListUserUsecase } from "../../application/usecase/list-user-usecase";
import { User } from "../../domain/model/user";

@injectable()
export class ListUserController {
  constructor(
    @inject(SYMBOLS.LIST_USER_USECASE)
    private readonly usecase: ListUserUsecase
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usecase.execute();
    return users;
  }
}
