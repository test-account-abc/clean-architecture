import { User } from "../../domain/model/user";

export interface UserDatabase {
  list(): Promise<Array<User>>;
  create(user: User): Promise<User>;
}
