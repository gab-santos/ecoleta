import "./config/dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { errors } from "celebrate";
import routes from "./routes";

class AppController {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());

    this.express.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
  }

  routes() {
    this.express.use(routes);
    this.express.use(errors());
  }
}

export default new AppController().express;
