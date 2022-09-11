import { useState } from "react";
import {
  Button,
  CrossIcon,
  Dialog,
  EditIcon,
  Heading,
  IconButton,
  Pane,
  Position,
  TextInput,
  toaster,
  Tooltip,
} from "evergreen-ui";
import UserItem from "../useritem/UserItem";
import "./newchannel.scss";
import { useEffect } from "react";
import { ChannelServices, UserServices } from "../../services";
import { useDispatch } from "react-redux";
import { addChannel } from "../../redux/features/channelSlice";

const NewChannel = () => {
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);
  const [chat, setChat] = useState({
    isGroup: false,
    recipients: [],
    name: "",
    description: "",
  });
  const [users, setUsers] = useState([]);

  const setIsGroup = (val) => () => {
    if (chat.isGroup !== val) {
      setChat({
        isGroup: val,
        recipients: [],
        name: "",
        description: "",
      });
    }
  };

  const setRecipient = (user) => () => {
    let recipients = [];
    let chatName = chat.name;
    if (chat.isGroup) {
      recipients = [...chat.recipients];
      const index = recipients.indexOf(user._id);
      if (index > -1) {
        recipients.splice(index, 1);
      } else {
        recipients.push(user._id);
      }
    } else {
      chatName = user.name;
      recipients = [user._id];
    }
    setChat({ ...chat, recipients: recipients, name: chatName });
  };

  const chatNameHandler = (e) => {
    setChat({ ...chat, name: e.target.value });
  };
  const chatDescHandler = (e) => {
    setChat({ ...chat, description: e.target.value });
  };

  const createChannel = () => {
    if (chat.isGroup && chat.name === "") {
      toaster.danger("Please enter a group name");
      return;
    }
    if (chat.recipients.length < 1) {
      toaster.danger("Please add recipient to the chat.");
      return;
    }
    ChannelServices.createChannel(chat)
      .then((response) => {
        dispatch(addChannel(response.data))
        setIsShown(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isShown) {
      UserServices.users()
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          toaster.danger(error.message);
        });
    }
  }, [isShown]);

  return (
    <>
      <Pane
        position="absolute"
        bottom={10}
        right={10}
        height={50}
        width={50}
        borderRadius="100%"
        elevation={3}
      >
        <Tooltip content="New chat" position={Position.LEFT}>
          <IconButton
            icon={EditIcon}
            intent="success"
            appearance="primary"
            height={50}
            borderRadius="100%"
            onClick={() => setIsShown(true)}
          />
        </Tooltip>
      </Pane>

      <Dialog
        isShown={isShown}
        confirmLabel="Start Chat"
        topOffset={10}
        sideOffset={10}
        heigth={200}
        hasHeader={false}
        onConfirm={createChannel}
        header={
          <Pane width="100%">
            <Pane
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={10}
            >
              <Pane>
                <Heading>Create new chat:</Heading>
              </Pane>
              <Pane>
                <IconButton icon={CrossIcon} appearance="minimal" />
              </Pane>
            </Pane>

            <Pane display="flex">
              <Button
                width="50%"
                borderBottomRightRadius={0}
                borderTopRightRadius={0}
                appearance={chat.isGroup ? "default" : "primary"}
                onClick={setIsGroup(false)}
              >
                Direct Message
              </Button>
              <Button
                width="50%"
                borderBottomLeftRadius={0}
                borderTopLeftRadius={0}
                appearance={chat.isGroup ? "primary" : "default"}
                onClick={setIsGroup(true)}
              >
                Create new group
              </Button>
            </Pane>
            <Pane
              display={chat.isGroup ? "flex" : "none"}
              justifyContent="space-between"
              marginTop={10}
            >
              <TextInput
                id="groupName"
                width="48%"
                name="groupName"
                placeholder="Group name"
                onInput={chatNameHandler}
                value={chat.name}
              />
              <TextInput
                id="groupDescription"
                width="48%"
                name="groupDescription"
                placeholder="Description"
                onInput={chatDescHandler}
                value={chat.description}
              />
            </Pane>
          </Pane>
        }
        onCloseComplete={() => setIsShown(false)}
      >
        <Pane width="100%" backgroundColor="#FFF">
          {users.map((user) => {
            const finded = chat.recipients.indexOf(user._id);
            return (
              <UserItem
                active={finded > -1 ? true : false}
                key={user._id}
                user={user}
                selectable
                multiple={chat.isGroup || false}
                onClick={setRecipient(user)}
              />
            );
          })}
        </Pane>
      </Dialog>
    </>
  );
};

export default NewChannel;
