import { Pane } from "evergreen-ui";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Userbar,
  Chat,
  SplashScreen,
  ChannelList,
  NewChannel,
  Search,
} from "../components";
import { addMessage, setAcknowledge } from "../redux/features/channelSlice";
import socketio from "../utils/socket";

const Main = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channel.current);
  const userId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    socketio.connect();
  }, []);

  useEffect(() => {
    if (socketio.socket) {
      //when a message received.
      socketio.socket.on("message_received", (msg) => {
        dispatch(addMessage({ channelId: msg.channel, message: msg }));
        let ackObj = {
          senderId: msg.sender,
          messageId: msg._id,
          channelId: msg.channel,
          receiverId: userId,
          ack: "delivered",
        };
        // acknowledge sended.
        socketio.emit("acknowledge_receive", ackObj);

        // acknowledge send if the current channel equal to message channel.
        if (msg.channel === currentChannelId) {
          ackObj.ack = "readed";
          socketio.emit("acknowledge_receive", ackObj);
        }
      });

      // when an acknowledge received.
      socketio.socket.on("acknowledge_send", (ackObj) => {
        dispatch(setAcknowledge(ackObj));
      });
    }
  }, [socketio.socket?.io]);

  return (
    <Pane
      display="flex"
      padding={50}
      background="#edeff0"
      height="100%"
      alignItems="stretch"
      justifyContent="center"
    >
      <Pane
        display="flex"
        borderRadius={5}
        width="100%"
        elevation={2}
        maxWidth={960}
        background="#FFFFFF"
        className="animate-zoom-in"
        alignItems="stretch"
        overflow="hidden"
      >
        <Pane
          width={320}
          background="#FFFFFF"
          display="flex"
          flexDirection="column"
          borderRight="solid 1px #DBE2EF"
          position="relative"
        >
          <Userbar />
          <Search />
          <ChannelList />
          <NewChannel />
        </Pane>
        <Pane flex={1}>
          {currentChannelId ? (
            <Chat channelId={currentChannelId} />
          ) : (
            <SplashScreen />
          )}
        </Pane>
      </Pane>
    </Pane>
  );
};

export default Main;
