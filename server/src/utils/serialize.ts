import "../config/dotenv";

const port = process.env.PORT || 3333;
const localIp = process.env.LOCAL_IP || "http://localhost";
const url = `${localIp}:${port}`;

interface Image {
  image: string;
  imageUrl?: string;
}

function array<T extends Image>(data: T[]): T[] {
  return data.map((data) => {
    return {
      ...data,
      imageUrl: `${url}/uploads/${data.image}`,
    };
  });
}

function object<T extends Image>(data: T): T {
  return {
    ...data,
    imageUrl: `${url}/uploads/${data.image}`,
  };
}

export default { array, object };
