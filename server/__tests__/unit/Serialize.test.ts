import Serialize from "../../src/utils/serialize";

interface Data {
  image: string;
}

const data: Data = {
  image: "imageName",
};

describe("Serialize", () => {
  it("should be able to serialize a array adding imageUrl field", () => {
    const serialized = Serialize.array<Data>([data]);

    serialized.map((item) => expect(item).toHaveProperty("imageUrl"));
  });

  it("should be able to serialize a object adding imageUrl field", () => {
    const serialized = Serialize.object<Data>(data);

    expect(serialized).toHaveProperty("imageUrl");
  });
});
