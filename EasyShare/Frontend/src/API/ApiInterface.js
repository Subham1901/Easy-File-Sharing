import axios from "axios";

const router = axios.create({
  baseURL: "https://easyshare-backend.onrender.com/app/",
});

export const uploadFileData = async (data) => {
  return await router.post("/file", data);
};
export const getFileInfo = async (id) => {
  return await router.get(`file/${id}`);
};
export const sendMailAPI = async (id, data) => {
  return router.post(`/send/${id}`, data);
};
