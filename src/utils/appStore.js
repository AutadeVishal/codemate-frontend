import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedSlice from "./feedSlice";
import connectionSlice from "./connectionSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed:feedSlice,
    connection:connectionSlice,
  },
});

export default appStore;
