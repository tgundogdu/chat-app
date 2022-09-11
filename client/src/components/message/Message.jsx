import { Pane, Text } from "evergreen-ui";
import MessageHelper from "../../utils/MessageHelpers";
import Tick from "../tick/Tick";
import "./message.scss";

const Message = ({
  msg,
  position = "right",
  sameUser,
  senderId,
  onDoubleClick,
}) => {
  return (
    <Pane className={`message ${position} ${sameUser ? "no-triangle" : ""}`}>
      <Pane
        className="box"
        background="#FFF"
        display="inline-flex"
        borderRadius={8}
        paddingLeft={10}
        paddingRight={10}
        paddingTop={6}
        paddingBottom={6}
        flexDirection="column"
        elevation={1}
        position="relative"
        onDoubleClick={onDoubleClick}
      >
        {position === "right" ? (
          <div className="tick">
            <Tick type={MessageHelper.chekAll(msg, senderId)} />
          </div>
        ) : (
          ""
        )}
        {position !== "right" && !sameUser ? (
          <Text
            size={300}
            fontWeight={600}
            marginBottom={4}
            marginTop={-3}
            color="#069"
          >
            {msg.sender.name}
          </Text>
        ) : (
          ""
        )}
        <Text color="dark">{msg.message}</Text>
      </Pane>
    </Pane>
  );
};

export default Message;
