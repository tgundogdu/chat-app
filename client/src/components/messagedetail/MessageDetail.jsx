import { Dialog, Heading, Pane } from "evergreen-ui";
import useMessageDetail from "../../hooks/useMessageDetail";
import MessageHelper from "../../utils/MessageHelpers";
import Message from "../message/Message";
import UserItem from "../useritem/UserItem";

const MessageDetail = ({ msg, onClose }) => {
  const { receivers, senderId } = useMessageDetail(msg);
  return (
    <Dialog
      isShown={true}
      title="Message Info"
      width={500}
      intent="danger"
      confirmLabel="Delete"
      onCloseComplete={onClose}
    >
      <Pane width="100%">
        <Pane padding={20} backgroundColor="#F7ECDE" borderRadius={5}>
          <Message msg={msg} position="right" senderId={senderId} />
        </Pane>
        <Heading marginTop={10}>Recipients: </Heading>
        <Pane marginTop={10}>
          {receivers.map((user) => {
            return (
              <UserItem
                key={user._id}
                user={user}
                msgStatus={MessageHelper.chekOne(msg, user._id)}
              />
            );
          })}
        </Pane>
      </Pane>
    </Dialog>
  );
};

export default MessageDetail;
