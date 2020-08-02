import request from "supertest";

import knex from "../../src/database/connection";
import app from "../../src/app";

describe("Items - Integration", () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  it("should list pre-created items", async () => {
    const response = await request(app).get("/items");

    expect(response.status).toBe(200);
    response.body.map((item: any) => expect(item).toHaveProperty("imageUrl"));
  });

  it("should list 6 items", async () => {
    const response = await request(app).get("/items");

    expect(response.body).toHaveLength(6);
  });
});
