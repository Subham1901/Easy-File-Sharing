import {
  getFileSuccess,
  sendMailD,
  uploadError,
  uploadReq,
  uploadSuccess,
} from ".";
import { getFileInfo, sendMailAPI, uploadFileData } from "../API/ApiInterface";

export const uploadFile = (file) => async (dispatch) => {
  await dispatch(uploadReq());
  try {
    const { data } = await uploadFileData(file);
    await dispatch(uploadSuccess(data));
  } catch (error) {
    await dispatch(uploadError(error));
  }
};

export const getFile = (id) => async (dispatch) => {
  try {
    const { data } = await getFileInfo(id);
    await dispatch(getFileSuccess(data));
  } catch (error) {
    await dispatch(uploadError(error));
  }
};

export const sendMail = (id, info) => async (dispatch) => {
  await dispatch({ type: "MAIL_LOADING" });
  try {
    const { data } = await sendMailAPI(id, info);
    await dispatch(sendMailD(data));
  } catch (error) {
    await dispatch({ type: "MAIL_ERROR", payload: error });
  }
};
