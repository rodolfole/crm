import "reflect-metadata";
import { createConnection } from "typeorm";

import { startServer } from "./app";

require("dotenv").config();

const main = async () => {
  createConnection().then(async (_) => {
    console.log("Database is Connected");
  });

  const app = await startServer();
  app.listen(process.env.PORT || 8000);
  console.log(`Server on PORT -> ${process.env.PORT}`);
};

main().catch((e) => console.log(e));
