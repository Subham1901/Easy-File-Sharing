import { combineReducers } from "redux";

const response = {
  loading: false,
  error: null,
  data: null,
};
const file = (state = response, { type, payload }) => {
  switch (type) {
    case "UPLOAD":
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case "ERROR":
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_FILE":
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    default:
      return state;
  }
};

const mail = { loading: false, error: null, data: null };
export const correspondence = (state = mail, { type, payload }) => {
  switch (type) {
    case "MAIL_LOADING":
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case "SEND_FILE":
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case "MAIL_ERROR":
      return {
        ...state,
        error: payload,
        loading: false,
        data: null,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  file,
  correspondence,
});
