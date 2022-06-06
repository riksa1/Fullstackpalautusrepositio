import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogReducer";
import notificationReducer from "./notificationReducer";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    user: userReducer,
  },
});

export default store;
