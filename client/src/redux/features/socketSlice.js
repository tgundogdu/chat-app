import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    io: null,
  },
  reducers: {
    connect: (state) => {
      const token = localStorage.getItem("token");
      const socket = io("ws://localhost:3001", {
        auth: { token },
      });

      socket.on("connect", () => {
        console.log("Connected socket id : " + socket.id);
      });

      state.io = socket;
    },
  },
});

export const { connect } = socketSlice.actions;

export default socketSlice.reducer;
