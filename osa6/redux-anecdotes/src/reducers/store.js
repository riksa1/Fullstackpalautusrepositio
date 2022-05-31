import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./anecdoteReducer";
import notifictionReducer from "./notificationReducer";
import searchReducer from "./searchReducer";

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    notification: notifictionReducer,
    search: searchReducer,
  },
});

export default store;
