import { DataSource, Repository } from "typeorm";
import { UserDatabase } from "../../adapter/interface/user-database";
import { User } from "../../domain/model/user";
import { UserEntity } from "../entity/user-entity";
import { inject, injectable } from "inversify";
import { SYMBOLS } from "../../di/symbols";

@injectable()
export class UserDatabaseImpl implements UserDatabase {
  private readonly manager: Repository<UserEntity>;

  constructor(
    @inject(SYMBOLS.DATA_SOURCE)
    private readonly dataSource: DataSource
  ) {
    this.manager = this.dataSource.getRepository(UserEntity);
  }

  public async list(): Promise<User[]> {
    const users = await this.manager.find();
    return users.map((user) => this.convertToUserModel(user));
  }

  public async create(user: User): Promise<User> {
    const userEntity = this.convertToUserEntity(user);
    await this.manager.save(userEntity);
    return user;
  }

  private convertToUserModel(userEntity: UserEntity): User {
    return new User(userEntity.id, userEntity.name, userEntity.email);
  }

  private convertToUserEntity(userModel: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = userModel.id;
    userEntity.name = userModel.name;
    userEntity.email = userModel.email;
    return userEntity;
  }
}
