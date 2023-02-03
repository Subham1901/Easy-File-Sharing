import express from "express";
import bodyParser from "body-parser";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import dotEnv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import fileRouter from "./routers/file-routers.js";
import { baseURL } from "./configs/config.js";
const app = express();
dotEnv.config();
mongoose.set("strictQuery", false);

//middlewares
app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,POST,OPTIONS",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/app", fileRouter);
app.use("/Files", express.static("Files"));

//Error handling
app.use((req, res, next) => {
  const error = {
    status: StatusCodes.NOT_FOUND,
    message: ReasonPhrases.NOT_FOUND,
  };
  return next(error);
});
app.use((err, req, res, next) => {
  res
    .status(err.status || StatusCodes.NOT_FOUND)
    .json({ message: err.message });

  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      next(err);
    });
  }
});

//DB + Server connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT_NUMBER || 5000, () => {
      console.log(`server running at port ${process.env.PORT_NUMBER || 5000}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
