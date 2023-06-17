import "reflect-metadata";
import { inject, injectable } from "inversify";
import { SYMBOLS } from "../../di/symbols";
import { UserRepository } from "../interface/user-repository";
import { User } from "../../domain/model/user";

@injectable()
export class ListUserUsecase {
  constructor(
    @inject(SYMBOLS.USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  public async execute(): Promise<Array<User>> {
    return await this.userRepository.list();
  }
}
