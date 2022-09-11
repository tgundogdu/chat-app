import {
  Avatar,
  Checkbox,
  CrossIcon,
  Heading,
  IconButton,
  Pane,
  Radio,
  Text,
} from "evergreen-ui";
import Tick from "../tick/Tick";
import "./useritem.scss";

const UserItem = ({
  user,
  active,
  disable,
  selectable,
  multiple,
  msgStatus,
  onClick,
  onDelete,
}) => {
  let usericon = "";
  let userclass = "";

  if (selectable) {
    if (multiple) {
      usericon = (
        <Checkbox
          width={20}
          checked={active || disable ? true : false}
          size={16}
          margin={0}
          disabled={disable}
        />
      );
    } else {
      usericon = <Radio checked={active ? true : false} size={16} />;
    }
    userclass = active ? "user-item selectable active" : "user-item selectable";
  } else {
    userclass = "user-item";
    usericon = <Tick type={msgStatus} />;
  }

  if (disable){
    userclass += " disabled";
  }

  if (onDelete) {
    usericon = (
      <IconButton onClick={onDelete} size="small" icon={CrossIcon}></IconButton>
    );
  }

  return (
    <Pane
      className={userclass}
      display="flex"
      padding={6}
      flexDirection="rowfalse"
      alignItems="center"
      onClick={disable ? null : onClick}
    >
      <Pane width={50}>
        <Avatar name={user.name} size={40} src={user.avatar} />
      </Pane>
      <Pane flex={1} className="center">
        <Heading className="nowrap">{user.name}</Heading>
        <Text size={300} opacity={0.5} color="neutral" className="nowrap">
          {user.email}
        </Text>
      </Pane>
      <Pane width={20} textAlign="right">
        {usericon}
      </Pane>
    </Pane>
  );
};

export default UserItem;
