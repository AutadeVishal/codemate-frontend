import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedSlice from "./feedSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed:feedSlice,
  },
});

export default appStore;
