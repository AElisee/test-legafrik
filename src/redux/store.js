import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks.slice.js";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
