import {
  EmojiIcon,
  IconButton,
  Pane,
  PaperclipIcon,
  SendMessageIcon,
  TextInput,
} from "evergreen-ui";
import "./typing.scss";

const Typing = ({ onSend }) => {
  const submit = (e) => {
    e.preventDefault();
    let msg = e.target.elements.messageinput.value;
    if (msg.trim() !== "") {
      onSend(msg.trim());
    }
    e.target.elements.messageinput.value = "";
    e.target.elements.messageinput.focus();
  };
  return (
    <form onSubmit={submit}>
      <Pane display="flex" padding={10} background="#F9F7F7">
        <Pane marginRight={10}>
          <IconButton
            icon={EmojiIcon}
            appearance="minimal"
            height={40}
            iconSize={20}
            type="button"
          />
        </Pane>
        <Pane marginRight={10}>
          <IconButton
            icon={PaperclipIcon}
            appearance="minimal"
            height={40}
            iconSize={20}
            type="button"
          />
        </Pane>
        <Pane flex={1}>
          <TextInput
            height={40}
            width="100%"
            name="messageinput"
            placeholder="Type a message..."
            autoComplete="off"
          />
        </Pane>
        <Pane marginLeft={10}>
          <IconButton
            icon={SendMessageIcon}
            appearance="minimal"
            height={40}
            iconSize={20}
            type="submit"
          />
        </Pane>
      </Pane>
    </form>
  );
};

export default Typing;
