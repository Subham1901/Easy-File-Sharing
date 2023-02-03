import express from "express";
import morgan from "morgan";
import { fileUpload } from "../middlewares/fule-upload.js";
import {
  uploadFile,
  getFile,
  sendMailto,
  getAllFiles,
} from "../controllers/upload.js";
const router = express.Router();
router.use(morgan("combined"));

router
  .post("/file", fileUpload.single("file"), uploadFile)
  .get("/file/:id", getFile)
  .post("/send/:id", sendMailto)
  .get("/", getAllFiles);

export default router;
