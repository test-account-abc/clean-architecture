import "reflect-metadata";
import { inject, injectable } from "inversify";
import { UserRepository } from "../../application/interface/user-repository";
import { User } from "../../domain/model/user";
import { UserDatabase } from "../interface/user-database";
import { SYMBOLS } from "../../di/symbols";

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @inject(SYMBOLS.USER_DATABASE)
    private readonly userDatabase: UserDatabase
  ) {}

  public async list(): Promise<Array<User>> {
    return await this.userDatabase.list();
  }

  public async create(user: User): Promise<User> {
    return await this.userDatabase.create(user);
  }
}
