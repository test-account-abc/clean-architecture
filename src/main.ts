import "reflect-metadata";
import cors from "cors";
import express from "express";
import { Container } from "inversify";
import { initContainer } from "./di/container";
import { initDataSource } from "./infrastructure/driver/database-driver";
import { ListUserController } from "./adapter/controller/list-user-constroller";
import { SYMBOLS } from "./di/symbols";

async function initAppContainer(): Promise<Container> {
  const dataSource = await initDataSource();
  const container = await initContainer({
    dataSource,
  });
  return container;
}

async function main() {
  const container = await initAppContainer();
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get("/users", async (_, res) => {
    const result = await container
      .get<ListUserController>(SYMBOLS.LIST_USER_CONTROLLER)
      .execute();
    res.status(200).json({
      users: result,
    });
  });

  app.listen(3000, "localhost", () =>
    console.log("Server listen on http://localhost:3000")
  );
}

main();
