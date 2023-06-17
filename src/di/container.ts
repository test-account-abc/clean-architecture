import { Container } from "inversify";
import { UserRepository } from "../application/interface/user-repository";
import { SYMBOLS } from "./symbols";
import { UserRepositoryImpl } from "../adapter/repository/user-repository-impl";
import { ListUserUsecase } from "../application/usecase/list-user-usecase";
import { UserDatabase } from "../adapter/interface/user-database";
import { UserDatabaseImpl } from "../infrastructure/database/user-database-impl";
import { DataSource } from "typeorm";
import { ListUserController } from "../adapter/controller/list-user-constroller";
import { IdGenerator } from "../application/interface/id-generator";
import { IdGeneratorImpl } from "../infrastructure/generator/id-generator-impl";
// import { CreateUserController } from "../adapter/controller/create-user-controller";
// import { CreateUserUsecase } from "../application/usecase/create-user-usecase";

export async function initContainer(params: {
  dataSource: DataSource;
}): Promise<Container> {
  const container = new Container();
  container
    .bind<ListUserUsecase>(SYMBOLS.LIST_USER_USECASE)
    .to(ListUserUsecase);
  container
    .bind<UserRepository>(SYMBOLS.USER_REPOSITORY)
    .to(UserRepositoryImpl);
  container
    .bind<ListUserController>(SYMBOLS.LIST_USER_CONTROLLER)
    .to(ListUserController);
  container
    .bind<DataSource>(SYMBOLS.DATA_SOURCE)
    .toConstantValue(params.dataSource);
  container.bind<UserDatabase>(SYMBOLS.USER_DATABASE).to(UserDatabaseImpl);
  container.bind<IdGenerator>(SYMBOLS.ID_GENERATOR).to(IdGeneratorImpl);

  // container
  //   .bind<CreateUserController>(SYMBOLS.CREATE_USER_CONTROLLER)
  //   .to(CreateUserController);
  // container
  //   .bind<CreateUserUsecase>(SYMBOLS.CREATE_USER_USECASE)
  //   .to(CreateUserUsecase);
  return container;
}
