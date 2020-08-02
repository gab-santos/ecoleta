import { Config } from "knex";
import path from "path";

const defaults: Config = {
  client: "sqlite3",
  migrations: {
    directory: path.resolve(__dirname, "..", "database", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "database", "seeds"),
  },
  useNullAsDefault: true,
};

const knexConfig = {
  test: {
    ...defaults,
    connection: {
      filename: path.resolve(__dirname, "..", "database", "test.sqlite"),
    },
  } as Config,

  development: {
    ...defaults,
    connection: {
      filename: path.resolve(__dirname, "..", "database", "database.sqlite"),
    },
  } as Config,
};

export = knexConfig;
