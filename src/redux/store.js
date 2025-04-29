import { configureStore } from "@reduxjs/toolkit";
import Main from "./slice/Main";

const store = configureStore({
  reducer: {
    Main: Main,
  },
});

export default store;
