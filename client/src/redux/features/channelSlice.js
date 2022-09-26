import { createSlice } from "@reduxjs/toolkit";

export const channelSlice = createSlice({
  name: "channels",
  initialState: { data: [], filter: "", current: null },
  reducers: {
    setChannels: (state, action) => {
      state.data = action.payload;
    },
    addChannel: (state, action) => {
      state.data.unshift(action.payload);
      state.current = action.payload._id;
    },
    removeChannel: (state, action) => {
      const index = state.data.findIndex((item) => item._id === action.payload);
      state.current = null;
      state.data.splice(index, 1);
    },
    setCurrentChannel: (state, action) => {
      state.current = action.payload;
    },
    setMessages: (state, action) => {
      const { channelId, messages } = action.payload;
      const index = state.data.findIndex((item) => item._id === channelId);
      state.data[index].messages = messages;
      state.data[index].loaded = true;
    },
    addMessage: (state, action) => {
      const { channelId, message } = action.payload;
      const index = state.data.findIndex((item) => item._id === channelId);
      if (index > -1 && state.data[index].messages) {
        const messageIndex = state.data[index].messages.findIndex(
          (msg) => msg._id === message._id
        );
        if (messageIndex < 0) {
          state.data[index].messages.push(message);
        }
      } else {
        state.data[index].messages = [message];
      }
    },
    setRecipients: (state, action) => {
      const { channelId, recipients } = action.payload;
      const index = state.data.findIndex((item) => item._id === channelId);
      state.data[index].recipients = recipients;
    },
    setReaded: (state, action) => {
      const { channelId, userId, msgIds } = action.payload;
      const index = state.data.findIndex((item) => item._id === channelId);
      for (const msgId of msgIds) {
        const msgIndex = state.data[index].messages.findIndex(
          (m) => m._id === msgId
        );
        const receiverIndex = state.data[index].messages[
          msgIndex
        ].info.findIndex((r) => r.receiverId === userId);
        state.data[index].messages[msgIndex].info[
          receiverIndex
        ].readDate = true;
      }
    },
    setAcknowledge: (state, action) => {
      const { channelId, messageId, receiverId, ack } = action.payload;
      const channelIndex = state.data.findIndex(
        (channel) => channel._id === channelId
      );
      const messageIndex = state.data[channelIndex].messages.findIndex(
        (msg) => msg._id === messageId
      );
      const receiverIndex = state.data[channelIndex].messages[
        messageIndex
      ].info.findIndex((receiver) => receiver.receiverId === receiverId);

      if (ack === "delivered") {
        state.data[channelIndex].messages[messageIndex].info[
          receiverIndex
        ].deliveredDate = action.payload.deliveredDate;
      } else if (ack === "readed") {
        state.data[channelIndex].messages[messageIndex].info[
          receiverIndex
        ].readDate = action.payload.readDate;
      } else {
        console.error("ACK type error.");
      }
    },
  },
});

export const {
  setChannels,
  addChannel,
  removeChannel,
  setCurrentChannel,
  setMessages,
  addMessage,
  setRecipients,
  setReaded,
  setAcknowledge,
} = channelSlice.actions;

export default channelSlice.reducer;
