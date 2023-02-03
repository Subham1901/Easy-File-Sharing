import multer from "multer";
import path from "path";

export const fileUpload = multer({
  limits: { fileSize: 1000000000 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "Files");
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now() + path.extname(file.originalname)}`;
      cb(null, path.normalize(uniqueName));
    },
  }),
});
