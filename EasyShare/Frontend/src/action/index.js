export const uploadSuccess = (data) => {
  return {
    type: "UPLOAD",
    payload: data,
  };
};

export const uploadError = (data) => {
  return {
    type: "ERROR",
    payload: data,
  };
};

export const uploadReq = () => {
  return {
    type: "LOADING",
    payload: null,
  };
};

export const getFileSuccess = (data) => {
  return {
    type: "GET_FILE",
    payload: data,
  };
};

export const sendMailD = (data) => {
  return {
    type: "SEND_FILE",
    payload: data,
  };
};
