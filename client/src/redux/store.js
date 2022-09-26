import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import channelSlice from "./features/channelSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    channel: channelSlice,
  },
});
