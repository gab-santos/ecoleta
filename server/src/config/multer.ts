import multer from "multer";
import path from "path";
import crypto from "crypto";

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString("hex");

      const isTestEnv = process.env.NODE_ENV === "test";
      const originalName = file.originalname.replace(" ", "-").toLowerCase();

      const filename = isTestEnv ? originalName : `${hash}-${originalName}`;

      callback(null, filename);
    },
  }),
};
