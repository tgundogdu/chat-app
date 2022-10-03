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
    socketio.socket.on("message_received", (msg) => {
      const acknowledge = {
        type: "delivered",
        channel: msg.channel,
        receiver: userId,
        messages: [{ id: msg._id, sender: msg.sender }],
      };

      socketio.emit("acknowledge_send", acknowledge);

      if (msg.channel === currentChannelId) {
        setTimeout(() => {
          socketio.emit("acknowledge_send", { ...acknowledge, type: "readed" });
        }, 200);

        const indis = msg.info.findIndex((r) => r.receiverId === userId);
        if (indis >= 0) msg.info[indis].readDate = new Date().toISOString();
      }

      dispatch(addMessage({ channelId: msg.channel, message: msg }));
    });

    socketio.socket.on("acknowledge_receive", (ack) => {
      //console.log(ack);
      dispatch(setAcknowledge(ack));
    });

    return () => {
      socketio.socket.off("connect");
      socketio.socket.off("message_received");
      socketio.socket.off("acknowledge_receive");
    };
  }, [currentChannelId]);

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
