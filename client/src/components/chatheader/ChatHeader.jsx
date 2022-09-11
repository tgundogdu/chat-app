import {
  Avatar,
  ChevronDownIcon,
  Heading,
  IconButton,
  Menu,
  MobileVideoIcon,
  Pane,
  Popover,
  Position,
  Text,
} from "evergreen-ui";
import DefaultGroupAvatar from "../../assets/images/group-avatar.png";
import UserDetail from "../userdetail/UserDetail";
import GroupDetail from "../groupdetail/GroupDetail";
import Confirmation from "../confirmation/Confirmation";
import useChatHeader from "../../hooks/useChatHeader";

const ChatHeader = ({ channel, userId }) => {
  const { isGroup, avatar, name } = channel;
  const {
    leaveConfirm,
    setLeaveConfirm,
    detail,
    setDetail,
    setDetailHandler,
    leaveHandler,
  } = useChatHeader(channel, userId);

  return (
    <Pane
      display="flex"
      padding={10}
      background="#F9F7F7"
      flexDirection="row"
      alignItems="center"
      borderBottom="solid 1px #DBE2EF"
    >
      <Pane>
        <Avatar
          display="block"
          name={name}
          src={isGroup && !avatar ? DefaultGroupAvatar : avatar}
          size={40}
          marginRight={16}
        />
      </Pane>
      <Pane flex={1}>
        <Pane>
          <Heading size={500} lineHeight={1}>
            {name}
          </Heading>
          <Text size={300}>online</Text>
        </Pane>
      </Pane>
      <Pane>
        <IconButton
          icon={MobileVideoIcon}
          appearance="minimal"
          height={40}
          iconSize={20}
        />
      </Pane>
      <Pane paddingLeft={10}>
        <Popover
          position={Position.BOTTOM_RIGHT}
          content={
            <Menu>
              <Menu.Group>
                {isGroup ? (
                  <>
                    <Menu.Item onClick={setDetailHandler}>Group Info</Menu.Item>
                    <Menu.Item
                      intent="danger"
                      onClick={() => setLeaveConfirm(true)}
                    >
                      Leave the group
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item onClick={setDetailHandler}>
                      Contact Info
                    </Menu.Item>
                    <Menu.Item
                      intent="danger"
                      onClick={() => setLeaveConfirm(true)}
                    >
                      Delete chat
                    </Menu.Item>
                  </>
                )}
              </Menu.Group>
            </Menu>
          }
        >
          <IconButton
            icon={ChevronDownIcon}
            appearance="minimal"
            height={40}
            iconSize={20}
          />
        </Popover>
      </Pane>

      {detail ? (
        isGroup ? (
          <GroupDetail group={detail} onClose={() => setDetail(null)} />
        ) : (
          <UserDetail user={detail} onClose={() => setDetail(null)} />
        )
      ) : (
        ""
      )}

      {leaveConfirm ? (
        <Confirmation
          intent="danger"
          onConfirm={leaveHandler}
          onClose={() => setLeaveConfirm(false)}
        >
          Are you sure want to leave from this conversation?
        </Confirmation>
      ) : (
        ""
      )}
    </Pane>
  );
};

export default ChatHeader;
