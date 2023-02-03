import { ReasonPhrases, StatusCodes } from "http-status-codes";
import moment from "moment/moment.js";
import mongoose from "mongoose";
import fileSize from "file-size";

import File from "../model/file-model.js";
import { sendMail } from "../middlewares/nodeMailer.js";
import { getTemplate } from "../configs/email-template.js";
import { baseURL } from "../configs/config.js";
export const uploadFile = async (req, res, next) => {
  try {
    console.log(req.file);
    const fileUpload = new File({
      filename: req.file.path,
      filesize: fileSize(req.file.size).human("jedec"),
      createdAt: moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a"),
    });
    try {
      fileUpload.save();
    } catch (error) {
      throw error;
    }
    res.json(fileUpload);
  } catch (error) {
    next(error);
  }
};

export const getFile = async (req, res, next) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.isValidObjectId(_id)) {
      return res
        .status(StatusCodes.NOT_IMPLEMENTED)
        .json({ message: "File not found!" });
    }
    const findFile = await File.findById(_id);
    res
      .status(StatusCodes.OK)
      .json({ message: ReasonPhrases.OK, fileinfo: findFile });
  } catch (error) {
    next(error);
  }
};

export const sendMailto = async (req, res, next) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.isValidObjectId(_id)) {
      return res
        .status(StatusCodes.NOT_IMPLEMENTED)
        .json({ message: "File not found!" });
    }
    const getFileInfo = await File.findById(_id);

    const send = await sendMail({
      from: req.body.from,
      to: req.body.to,
      subject: "File sharing!!",
      text: `${req.body.from} shared a file with you.`,
      html: getTemplate({
        size: getFileInfo.filesize,
        link: `${baseURL}${getFileInfo._id}`,
        baseURL,
      }),
    });
    res.status(200).json({
      message: ReasonPhrases.OK,
      mailResponse: "Mail sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllFiles = async (req, res, next) => {
  try {
    const getAllfiles = await File.find().lean();
    console.log(getAllfiles);
    res.status(200).json(getAllfiles);
  } catch (error) {
    next(error);
  }
};
