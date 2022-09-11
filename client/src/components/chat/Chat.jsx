import { Pane } from "evergreen-ui";
import ChatHeader from "../chatheader/ChatHeader";
import Message from "../message/Message";
import Typing from "../typing/Typing";
import { useEffect, useRef } from "react";
import useChat from "../../hooks/useChat";
import MessageDetail from "../messagedetail/MessageDetail";
import "./chat.scss";

let prevUserId = null;
const Chat = ({ channelId }) => {
  const scrollerRef = useRef(null);
  const {
    userId,
    channel,
    currentMessage,
    sendMessage,
    setCurrentMessage,
  } = useChat(channelId);

  useEffect(() => {
    scrollerRef.current?.scrollIntoView();
  }, [channel.messages]);

  return (
    <Pane
      display="flex"
      flexDirection="column"
      background="#FFF"
      height="100%"
      width="100%"
    >
      <Pane>
        <ChatHeader channel={channel} userId={userId} />
      </Pane>
      <Pane
        flex={1}
        padding={40}
        paddingBottom={0}
        background="#F7ECDE"
        overflowY="auto"
      >
        {channel.messages?.map((msg) => {
          const senderId = msg.sender._id || msg.sender;
          const sameUser = prevUserId === senderId ? true : false;
          const position = senderId === userId ? "right" : "left";
          prevUserId = senderId;
          return (
            <Message
              key={msg._id}
              msg={msg}
              position={position}
              sameUser={sameUser}
              senderId={senderId}
              onDoubleClick={
                senderId === userId ? () => setCurrentMessage(msg) : null
              }
            />
          );
        })}
        <Pane ref={scrollerRef} marginTop={20} />
      </Pane>
      <Pane>
        <Typing onSend={sendMessage} />
      </Pane>

      {currentMessage ? (
        <MessageDetail
          msg={currentMessage}
          onClose={() => setCurrentMessage(null)}
        />
      ) : (
        ""
      )}
    </Pane>
  );
};

export default Chat;
