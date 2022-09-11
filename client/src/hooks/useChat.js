import { toaster } from "evergreen-ui";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  setMessages,
  setReaded,
} from "../redux/features/channelSlice";
import { ChannelServices } from "../services";

const useChat = (channelId) => {
  const dispatch = useDispatch();
  const [currentMessage, setCurrentMessage] = useState(null);
  const userId = useSelector((state) => state.auth.user._id);
  const channel = useSelector((state) => {
    return state.channel.data.find((item) => item._id === channelId);
  });

  //send message and add to store
  const sendMessage = (msg) => {
    ChannelServices.sendMessage({ channel: channelId, message: msg })
      .then((response) => {
        dispatch(addMessage({ channelId: channelId, message: response.data }));
      })
      .catch((error) => {
        console.log("hataaa");
      });
  };

  //find all unread messages in this channel for this user and make them readed.
  const makeReaded = (messages) => {
    const unreadMessages = [];
    if (messages.length) {
      for (const msg of messages) {
        if (msg.sender._id !== userId) {
          const unread = msg.info.find(
            (receiver) =>
              receiver.receiverId === userId && receiver.readDate === null
          );
          if (unread) {
            unreadMessages.push(msg._id);
          }
        }
      }
    }

    const obj = {
      channelId,
      userId,
      msgIds: unreadMessages,
    };

    if (unreadMessages.length > 0) {
      ChannelServices.sendMsgInfo({ msgIds: unreadMessages, type: "readed" })
        .then((response) => {
          dispatch(setReaded(obj));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //load channel message when channelId change.
  useEffect(() => {
    if (!channel.loaded) {
      ChannelServices.getMessages(channelId)
        .then((response) => {
          dispatch(
            setMessages({ channelId: channelId, messages: response.data })
          );
          makeReaded(response.data);
        })
        .catch((error) => {
          toaster.danger("Chat messages cannot listed.");
        });
    }
  }, [channelId]);

  return { userId, channel, sendMessage, currentMessage, setCurrentMessage };
};

export default useChat;