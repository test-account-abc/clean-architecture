import { DataSource } from "typeorm";
import { UserEntity } from "../entity/user-entity";

export async function initDataSource(): Promise<DataSource> {
  const dataSource = new DataSource({
    synchronize: true,
    entities: [UserEntity],
    type: "sqlite",
    database: "database.sqlite3",
  });
  await dataSource.initialize();
  return dataSource;
}
