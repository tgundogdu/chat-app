import { Avatar, Pane, Text } from "evergreen-ui";
import "./channel.scss";
import DefaultGroupAvatar from "../../assets/images/group-avatar.png";
import useChannel from "../../hooks/useChannel";

const Channel = ({ data, active, userId, onSelect }) => {
  const {message, status, time} = useChannel(data, userId);

  return (
    <Pane
      className={`channel ${active ? "active" : ""} ${status}`}
      display="flex"
      padding={10}
      flexDirection="row"
      alignItems="center"
      maxWidth="100%"
      onClick={onSelect}
    >
      <Pane width={60}>
        <Avatar
          name={data.name}
          size={50}
          marginRight={10}
          src={data.isGroup && !data.avatar ? DefaultGroupAvatar : data.avatar}
        />
      </Pane>
      <Pane flex={1} className="info">
        <Pane
          flexDirection="row"
          marginBottom={3}
          justifyContent="flex-start"
          display="flex"
        >
          <Text flex={1} size={500} className="title">
            {data.name}
          </Text>
          <Text size={300} color="muted" className="time-ago">
            {time}
          </Text>
        </Pane>
        <Pane flexDirection="row" justifyContent="space-between" display="flex">
          <Text color="muted" size={400} className="last-message">
            {message ? message.message : "..."}
          </Text>
          <Pane>{status === "unread" ? <Text className="badge"></Text> : ""}</Pane>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default Channel;
