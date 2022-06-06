import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    successMessage: null,
    errorMessage: null,
    timeout: null,
    errorTimeout: null,
  },
  reducers: {
    changeMessage(state, action) {
      return {
        ...state,
        successMessage: action.payload.message,
        timeout: action.payload.timeout,
      };
    },
    changeErrorMessage(state, action) {
      return {
        ...state,
        errorMessage: action.payload.message,
        errorTimeout: action.payload.timeout,
      };
    },
    clearMessage(state) {
      return {
        ...state,
        successMessage: null,
      };
    },
    clearErrorMessage(state) {
      return {
        ...state,
        errorMessage: null,
      };
    },
  },
});

export const setMessage =
  (message, seconds, timeoutbefore, type) => async (dispatch) => {
    try {
      const time = seconds * 1000;
      if (timeoutbefore !== null) {
        clearTimeout(timeoutbefore);
      }
      const timeout = setTimeout(() => {
        if (type === "message") {
          dispatch(clearMessage());
        } else {
          dispatch(clearErrorMessage());
        }
      }, time);
      if (type === "message") {
        dispatch(changeMessage({ message: message, timeout: timeout }));
      } else {
        dispatch(changeErrorMessage({ message: message, timeout: timeout }));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const {
  changeMessage,
  clearMessage,
  changeErrorMessage,
  clearErrorMessage,
} = notificationSlice.actions;
export default notificationSlice.reducer;
