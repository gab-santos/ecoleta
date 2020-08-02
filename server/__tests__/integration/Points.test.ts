import request from "supertest";
import faker from "faker";
import path from "path";
import fs from "fs";

import knex from "../../src/database/connection";
import app from "../../src/app";

import PointsRepository from "../../src/repositories/PointsRepository";
import PointItemsRepository from "../../src/repositories/PointItemsRepository";

const testImageName = "imageTest.jpg";
const testImagePath = path.resolve(__dirname, "..", testImageName);
const testImageUploadPath = path.resolve(
  __dirname,
  "..",
  "..",
  "uploads",
  testImageName
);

const dataFake = {
  point: {
    image: testImagePath,
    name: faker.company.companyName(),
    email: faker.internet.email(),
    whatsapp: faker.phone.phoneNumber(),
    latitude: Number(faker.address.latitude()),
    longitude: Number(faker.address.longitude()),
    city: faker.address.city(),
    uf: faker.address.stateAbbr(),
  },
  // Lâmpadas, Pilhas e Baterias, Óleo de Cozinha
  items: "1, 2, 6",
};

async function deleteUploadedTestImage() {
  fs.existsSync(testImageUploadPath) && fs.unlinkSync(testImageUploadPath);
}

describe("Items - Integration", () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    await deleteUploadedTestImage();
  });

  afterAll(async () => {
    await knex.destroy();
    await deleteUploadedTestImage();
  });

  it("should be able to create a point", async () => {
    const response = await request(app)
      .post("/points")
      .attach("image", dataFake.point.image)
      .field("name", dataFake.point.name)
      .field("email", dataFake.point.email)
      .field("whatsapp", dataFake.point.whatsapp)
      .field("latitude", dataFake.point.latitude)
      .field("longitude", dataFake.point.longitude)
      .field("uf", dataFake.point.uf)
      .field("city", dataFake.point.city)
      .field("items", dataFake.items);

    const testImageUploaded = fs.existsSync(testImageUploadPath);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("imageUrl");
    expect(testImageUploaded).toBeTruthy();
  });

  it("should be able to list the items of the point", async () => {
    const pointId = await PointsRepository.create({
      ...dataFake.point,
      image: testImageName,
    });

    await PointItemsRepository.create(dataFake.items, pointId);

    const response = await request(app).get(`/points/${pointId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("items");
  });

  it("should return error message when try list a point and the point doesn't exists", async () => {
    const response = await request(app).get("/points/1");

    expect(response.status).toBe(404);
  });

  it("should be able to list a single point", async () => {
    const pointId = await PointsRepository.create({
      ...dataFake.point,
      image: testImageName,
    });

    const response = await request(app).get(`/points/${pointId}`);

    expect(response.status).toBe(200);
    expect(response.body.point).toHaveProperty("imageUrl");
  });

  it("should be able to list points filtered by city, uf and items", async () => {
    const city = "City";
    const uf = "UF";

    const pointId1 = await PointsRepository.create({
      ...dataFake.point,
      image: testImageName,
      city,
      uf,
    });
    await PointItemsRepository.create(dataFake.items, pointId1);

    const pointId2 = await PointsRepository.create({
      ...dataFake.point,
      image: testImageName,
    });
    await PointItemsRepository.create("4, 5", pointId2);

    const response = await request(app).get("/points").query({
      city,
      uf,
      items: dataFake.items,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    response.body.map((point: any) => expect(point).toHaveProperty("imageUrl"));
    expect(response.body[0].id).toEqual(pointId1);
    expect(response.body[0].city).toEqual(city);
    expect(response.body[0].uf).toEqual(uf);
  });
});
