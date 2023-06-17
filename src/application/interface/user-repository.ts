import { User } from "../../domain/model/user";

export interface UserRepository {
  list(): Promise<Array<User>>;
  create(user: User): Promise<User>;
}
